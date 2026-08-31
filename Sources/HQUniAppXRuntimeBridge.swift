//
//  HQUniAppXRuntimeBridge.swift
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

import DCloudUniappRuntime
import Foundation
import ObjectiveC
import UIKit

@objc(HQUniAppXRuntimeBridge)
@objcMembers
public final class HQUniAppXRuntimeBridge: NSObject {
    private static var didSetup = false
    private static var didStart = false
    private static var targetUrlAssociationKey: UInt8 = 0

    @objc(setup)
    public static func setup() {
        guard !didSetup else {
            return
        }
        UniAppXSDK.initSDK()
        didSetup = true
    }

    @objc(didFinishLaunching:options:)
    public static func didFinishLaunching(_ application: UIApplication?, options: [AnyHashable: Any]?) {
        setup()
    }

    @objc(open:url:options:)
    public static func open(_ application: UIApplication?, url: URL, options: [AnyHashable: Any]?) -> Bool {
        guard didStart else {
            return false
        }
        UniAppXSDK.applicationOpenURLOptions(application, url, openURLOptions(from: options))
        return true
    }

    @objc(continueUserActivity:userActivity:)
    public static func continueUserActivity(_ application: UIApplication?, userActivity: NSUserActivity?) -> Bool {
        guard didStart else {
            return false
        }
        UniAppXSDK.applicationContinueUserActivityRestorationHandler(application, userActivity) { _ in }
        return true
    }

    public static func applicationWillResignActive(_ application: UIApplication?) {
        guard didStart else { return }
        UniAppXSDK.applicationWillResignActive(application)
    }

    public static func applicationDidBecomeActive(_ application: UIApplication?) {
        guard didStart else { return }
        UniAppXSDK.applicationDidBecomeActive(application)
    }

    public static func applicationDidEnterBackground(_ application: UIApplication?) {
        guard didStart else { return }
        UniAppXSDK.applicationDidEnterBackground(application)
    }

    public static func applicationWillEnterForeground(_ application: UIApplication?) {
        guard didStart else { return }
        UniAppXSDK.applicationWillEnterForeground(application)
    }

    @objc(startFrom:)
    public static func start(from viewController: UIViewController) -> Bool {
        let options = UniAppXSDKStartOptions()
        let launchUrl = currentLaunchUrl()
        let rawTargetUrl = currentRawTargetUrl()
        logStartDiagnostics(launchUrl: launchUrl)
        options.appScheme = launchUrl
        options.appLink = launchUrl
        options.openType = .push
        options.animationType = .auto
        options.viewController = viewController
        viewController.navigationController?.setNavigationBarHidden(true, animated: false)
        if let existingUniAppRoot = existingUniAppRootViewController(in: viewController.navigationController, targetUrl: rawTargetUrl) {
            viewController.navigationController?.popToViewController(existingUniAppRoot, animated: true)
            configureHiddenNavigationBarForUniAppXRoot(existingUniAppRoot)
            return true
        }
        if containsUniAppRootViewController(in: viewController.navigationController) {
            if didStart {
                UniAppXSDK.exit()
                didStart = false
            }
            removeExistingUniAppRootViewControllers(from: viewController.navigationController, keeping: viewController)
        } else if didStart {
            UniAppXSDK.exit()
            didStart = false
        }
        if let helperClass = NSClassFromString("HqNavigationDelegateHelper") as? NSObject.Type {
            let selector = NSSelectorFromString("addNeedHiddenNavBarViewControllers:")
            if helperClass.responds(to: selector) {
                _ = helperClass.perform(selector, with: hiddenNavigationBarViewControllerClassNames())
            }
        }
        configureHiddenNavigationBarForUniAppXRoot(from: viewController)
        UniAppXSDK.start(options: options)
        registerNativeBridgeGlobalObject()
        didStart = true
        DispatchQueue.main.async {
            registerNativeBridgeGlobalObject()
            configureHiddenNavigationBarForUniAppXRoot(from: viewController)
        }
        return true
    }

    public static func exit() {
        UniAppXSDK.exit()
        didStart = false
    }

    private static func hiddenNavigationBarViewControllerClassNames() -> [String] {
        [
            "HQUniAppXContainerViewController",
            NSStringFromClass(UniAppRootViewController.self)
        ]
    }

    private static func launchOptions(from options: [AnyHashable: Any]?) -> [UIApplication.LaunchOptionsKey: Any]? {
        guard let options = options else {
            return nil
        }
        var result: [UIApplication.LaunchOptionsKey: Any] = [:]
        for (key, value) in options {
            if let typedKey = key as? UIApplication.LaunchOptionsKey {
                result[typedKey] = value
            } else if let stringKey = key as? String {
                result[UIApplication.LaunchOptionsKey(rawValue: stringKey)] = value
            }
        }
        return result
    }

    private static func openURLOptions(from options: [AnyHashable: Any]?) -> [UIApplication.OpenURLOptionsKey: Any]? {
        guard let options = options else {
            return nil
        }
        var result: [UIApplication.OpenURLOptionsKey: Any] = [:]
        for (key, value) in options {
            if let typedKey = key as? UIApplication.OpenURLOptionsKey {
                result[typedKey] = value
            } else if let stringKey = key as? String {
                result[UIApplication.OpenURLOptionsKey(rawValue: stringKey)] = value
            }
        }
        return result
    }

    private static func currentLaunchUrl() -> String {
        let rawTargetUrl = currentRawTargetUrl()
        guard !rawTargetUrl.isEmpty else {
            return "__UNI__DF02813://pages/router/router"
        }
        
        let targetParams = currentTargetParams()
        var query: [String: Any] = [
            "targetUrl": rawTargetUrl,
            "targetParams": jsonString(from: targetParams)
        ]
        query["publicParams"] = jsonString(from: publicParams())
        return "__UNI__DF02813://pages/router/router?\(queryString(from: query))"
    }

    private static func currentRawTargetUrl() -> String {
        guard let params = UserDefaults.standard.dictionary(forKey: "HQUniAppXLaunchParamsDefaultsKey") else {
            return ""
        }

        let rawTargetUrl = params["targetUrl"] as? String ?? ""
        return rawTargetUrl
    }

    private static func currentTargetParams() -> [String: Any] {
        guard let params = UserDefaults.standard.dictionary(forKey: "HQUniAppXLaunchParamsDefaultsKey") else {
            return [:]
        }
        return params["targetParams"] as? [String: Any] ?? [:]
    }

    private static func publicParams() -> [String: Any] {
        if let params = nativePublicParams(), !params.isEmpty {
            return params
        }
        return [
            "appid": "edu24olapp",
            "_appid": "edu24olapp",
            "org_id": 2,
            "schId": 2,
            "pschId": 14,
            "platform": "ios",
            "edu24ol_token": "",
            "passport": ""
        ]
    }

    private static func nativePublicParams() -> [String: Any]? {
        guard let bridge = NSClassFromString("HQUniAppXNativeBridge") as? NSObject.Type else {
            return nil
        }
        let selector = NSSelectorFromString("getPublicParams")
        guard bridge.responds(to: selector),
              let result = bridge.perform(selector)?.takeUnretainedValue() as? [String: Any] else {
            return nil
        }
        return result
    }

    private static func registerNativeBridgeGlobalObject() {
        guard let bridge = NSClassFromString("HQUniAppXNativeBridge") as? NSObject.Type else {
            return
        }
        let selector = NSSelectorFromString("registerGlobalObjectIfNeeded")
        guard bridge.responds(to: selector) else {
            return
        }
        _ = bridge.perform(selector)
    }

    private static func configureHiddenNavigationBarForUniAppXRoot(from viewController: UIViewController) {
        guard let navigationController = viewController.navigationController else {
            return
        }
        navigationController.setNavigationBarHidden(true, animated: false)
        guard let uniAppRoot = navigationController.topViewController,
              NSStringFromClass(type(of: uniAppRoot)).contains("UniAppRootViewController") else {
            return
        }
        setAssociatedTargetUrl(currentRawTargetUrl(), for: uniAppRoot)
        configureHiddenNavigationBarForUniAppXRoot(uniAppRoot)
    }

    private static func configureHiddenNavigationBarForUniAppXRoot(_ uniAppRoot: UIViewController) {
        uniAppRoot.setValue(true, forKey: "fd_prefersNavigationBarHidden")
        guard let helperClass = NSClassFromString("HqNavigationDelegateHelper") as? NSObject.Type else {
            return
        }
        let selector = NSSelectorFromString("addNeedHiddenNavBarViewController:")
        guard helperClass.responds(to: selector) else {
            return
        }
        _ = helperClass.perform(selector, with: uniAppRoot)
    }

    private static func containsUniAppRootViewController(in navigationController: UINavigationController?) -> Bool {
        guard let navigationController = navigationController else {
            return false
        }
        return navigationController.viewControllers.contains { viewController in
            isUniAppRootViewController(viewController)
        }
    }

    private static func existingUniAppRootViewController(in navigationController: UINavigationController?, targetUrl: String) -> UIViewController? {
        guard !targetUrl.isEmpty,
              let navigationController = navigationController else {
            return nil
        }
        return navigationController.viewControllers.first { viewController in
            isUniAppRootViewController(viewController) && associatedTargetUrl(for: viewController) == targetUrl
        }
    }

    private static func removeExistingUniAppRootViewControllers(from navigationController: UINavigationController?, keeping currentViewController: UIViewController) {
        guard let navigationController = navigationController else {
            return
        }
        let filteredViewControllers = navigationController.viewControllers.filter { viewController in
            viewController === currentViewController || !isUniAppRootViewController(viewController)
        }
        guard filteredViewControllers.count != navigationController.viewControllers.count,
              !filteredViewControllers.isEmpty else {
            return
        }
        navigationController.setViewControllers(filteredViewControllers, animated: false)
    }

    private static func isUniAppRootViewController(_ viewController: UIViewController) -> Bool {
        NSStringFromClass(type(of: viewController)).contains("UniAppRootViewController")
    }

    private static func setAssociatedTargetUrl(_ targetUrl: String, for viewController: UIViewController) {
        guard !targetUrl.isEmpty else {
            return
        }
        objc_setAssociatedObject(viewController, &targetUrlAssociationKey, targetUrl, .OBJC_ASSOCIATION_COPY_NONATOMIC)
    }

    private static func associatedTargetUrl(for viewController: UIViewController) -> String? {
        objc_getAssociatedObject(viewController, &targetUrlAssociationKey) as? String
    }

    private static func logStartDiagnostics(launchUrl: String) {
        let bundle = Bundle.main
        let appRoot = bundle.path(forResource: "__UNI__DF02813", ofType: nil, inDirectory: "uni-app-x/apps") ?? ""
        let wwwRoot = (appRoot as NSString).appendingPathComponent("www")
        let appConfigPath = (wwwRoot as NSString).appendingPathComponent("app-config.js")
        let appServicePath = (wwwRoot as NSString).appendingPathComponent("app-service.js")
        let manifestPath = (wwwRoot as NSString).appendingPathComponent("manifest.json")
        let bridgeClass = NSClassFromString("HQUniAppXNativeBridge")
        NSLog("[HQUniAppX] start launchUrl:%@", launchUrl)
        NSLog("[HQUniAppX] resource appRoot:%@ exists:%@", appRoot, FileManager.default.fileExists(atPath: appRoot) ? "YES" : "NO")
        NSLog("[HQUniAppX] resource app-config:%@ exists:%@", appConfigPath, FileManager.default.fileExists(atPath: appConfigPath) ? "YES" : "NO")
        NSLog("[HQUniAppX] resource app-service:%@ exists:%@", appServicePath, FileManager.default.fileExists(atPath: appServicePath) ? "YES" : "NO")
        NSLog("[HQUniAppX] resource manifest:%@ exists:%@", manifestPath, FileManager.default.fileExists(atPath: manifestPath) ? "YES" : "NO")
        NSLog("[HQUniAppX] native bridge class:%@", bridgeClass != nil ? "YES" : "NO")
    }

    private static func jsonString(from dictionary: [String: Any]) -> String {
        guard JSONSerialization.isValidJSONObject(dictionary),
              let data = try? JSONSerialization.data(withJSONObject: dictionary, options: []),
              let string = String(data: data, encoding: .utf8) else {
            return "{}"
        }
        return string
    }

    private static func queryString(from dictionary: [String: Any]) -> String {
        dictionary
            .sorted { $0.key < $1.key }
            .map { key, value in
                "\(queryEncoded(key))=\(queryEncoded(String(describing: value)))"
            }
            .joined(separator: "&")
    }

    private static func queryEncoded(_ string: String) -> String {
        var allowed = CharacterSet.urlQueryAllowed
        allowed.remove(charactersIn: "&+=?#")
        return string.addingPercentEncoding(withAllowedCharacters: allowed) ?? ""
    }
}
