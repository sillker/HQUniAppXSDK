//
//  HQUniAppXBridge.m
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import "HQUniAppXBridge.h"
#import "HQUniAppXDefines.h"
#import "HQUniAppXLaunchStore.h"
#import "HQUniAppXNativeBridge.h"

#if __has_include("HQUniAppXSDK-Swift.h")
#import "HQUniAppXSDK-Swift.h"
#endif

@implementation HQUniAppXBridge

+ (void)setup
{
    [HQUniAppXNativeBridge setupJSBridge];
    Class bridgeClass = [self runtimeBridgeClass];
    SEL selector = NSSelectorFromString(@"setup");
    if (bridgeClass && [bridgeClass respondsToSelector:selector]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [bridgeClass performSelector:selector];
#pragma clang diagnostic pop
    }
}

+ (void)didFinishLaunching:(UIApplication *)application options:(NSDictionary *)launchOptions
{
    Class bridgeClass = [self runtimeBridgeClass];
    SEL selector = NSSelectorFromString(@"didFinishLaunching:options:");
    if (bridgeClass && [bridgeClass respondsToSelector:selector]) {
        NSMethodSignature *signature = [bridgeClass methodSignatureForSelector:selector];
        NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
        invocation.target = bridgeClass;
        invocation.selector = selector;
        [invocation setArgument:&application atIndex:2];
        NSDictionary *options = launchOptions ?: @{};
        [invocation setArgument:&options atIndex:3];
        [invocation invoke];
    }
}

+ (BOOL)openURL:(NSURL *)url options:(NSDictionary *)options
{
    Class bridgeClass = [self runtimeBridgeClass];
    SEL selector = NSSelectorFromString(@"open:url:options:");
    if (!bridgeClass || ![bridgeClass respondsToSelector:selector]) {
        return NO;
    }
    
    BOOL handled = NO;
    NSMethodSignature *signature = [bridgeClass methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = bridgeClass;
    invocation.selector = selector;
    UIApplication *application = UIApplication.sharedApplication;
    [invocation setArgument:&application atIndex:2];
    [invocation setArgument:&url atIndex:3];
    NSDictionary *safeOptions = options ?: @{};
    [invocation setArgument:&safeOptions atIndex:4];
    [invocation invoke];
    if (signature.methodReturnLength == sizeof(BOOL)) {
        [invocation getReturnValue:&handled];
    }
    return handled;
}

+ (void)applicationWillResignActive:(UIApplication *)application
{
    [self invokeRuntimeSelector:NSSelectorFromString(@"applicationWillResignActive:") application:application];
}

+ (void)applicationDidBecomeActive:(UIApplication *)application
{
    [self invokeRuntimeSelector:NSSelectorFromString(@"applicationDidBecomeActive:") application:application];
}

+ (void)applicationDidEnterBackground:(UIApplication *)application
{
    [self invokeRuntimeSelector:NSSelectorFromString(@"applicationDidEnterBackground:") application:application];
}

+ (void)applicationWillEnterForeground:(UIApplication *)application
{
    [self invokeRuntimeSelector:NSSelectorFromString(@"applicationWillEnterForeground:") application:application];
}

+ (BOOL)continueUserActivity:(NSUserActivity *)userActivity
{
    Class bridgeClass = [self runtimeBridgeClass];
    SEL selector = NSSelectorFromString(@"continueUserActivity:userActivity:");
    if (!bridgeClass || ![bridgeClass respondsToSelector:selector]) {
        return NO;
    }
    
    BOOL handled = NO;
    NSMethodSignature *signature = [bridgeClass methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = bridgeClass;
    invocation.selector = selector;
    UIApplication *application = UIApplication.sharedApplication;
    [invocation setArgument:&application atIndex:2];
    [invocation setArgument:&userActivity atIndex:3];
    [invocation invoke];
    if (signature.methodReturnLength == sizeof(BOOL)) {
        [invocation getReturnValue:&handled];
    }
    return handled;
}

+ (BOOL)isRuntimeAvailable
{
    return [self runtimeBridgeClass] != nil;
}

+ (BOOL)startFromViewController:(UIViewController *)viewController error:(NSError **)error
{
    [HQUniAppXNativeBridge setupJSBridge];
    if (!viewController) {
        if (error) {
            *error = [NSError errorWithDomain:HQUniAppXErrorDomain code:HQUniAppXErrorCodeInvalidParameter userInfo:@{NSLocalizedDescriptionKey : @"UniAppX start failed: from viewController is nil"}];
        }
        return NO;
    }
    
    if (![self isRuntimeAvailable]) {
        if (error) {
            *error = [NSError errorWithDomain:HQUniAppXErrorDomain code:HQUniAppXErrorCodeRuntimeMissing userInfo:@{NSLocalizedDescriptionKey : @"UniAppX Runtime is missing. Please integrate DCloud iOS SDK and DCloudUTSExtAPI.xcframework."}];
        }
        [[NSNotificationCenter defaultCenter] postNotificationName:HQUniAppXBridgeStartNotification object:nil userInfo:@{
            @"appid" : HQUniAppXAppId,
            @"routerPage" : HQUniAppXRouterPagePath,
            @"launchParams" : [[HQUniAppXLaunchStore sharedStore] currentLaunchParams],
            @"available" : @NO
        }];
        return NO;
    }
    
    Class bridgeClass = [self runtimeBridgeClass];
    SEL selector = NSSelectorFromString(@"startFrom:");
    if (!bridgeClass || ![bridgeClass respondsToSelector:selector]) {
        if (error) {
            *error = [NSError errorWithDomain:HQUniAppXErrorDomain code:HQUniAppXErrorCodeStartFailed userInfo:@{NSLocalizedDescriptionKey : @"UniAppX Runtime exists, but start bridge is unavailable."}];
        }
        return NO;
    }
    
    BOOL started = NO;
    NSMethodSignature *signature = [bridgeClass methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = bridgeClass;
    invocation.selector = selector;
    [invocation setArgument:&viewController atIndex:2];
    [invocation invoke];
    if (signature.methodReturnLength == sizeof(BOOL)) {
        [invocation getReturnValue:&started];
    }
    
    [[NSNotificationCenter defaultCenter] postNotificationName:HQUniAppXBridgeStartNotification object:nil userInfo:@{
        @"appid" : HQUniAppXAppId,
        @"routerPage" : HQUniAppXRouterPagePath,
        @"launchParams" : [[HQUniAppXLaunchStore sharedStore] currentLaunchParams],
        @"available" : @YES,
        @"started" : @(started)
    }];
    return started;
}

+ (Class)runtimeBridgeClass
{
#if __has_include("HQUniAppXSDK-Swift.h")
    return HQUniAppXRuntimeBridge.class;
#else
    return NSClassFromString(@"HQUniAppXRuntimeBridge");
#endif
}

+ (void)invokeRuntimeSelector:(SEL)selector application:(UIApplication *)application
{
    Class bridgeClass = [self runtimeBridgeClass];
    if (!bridgeClass || ![bridgeClass respondsToSelector:selector]) {
        return;
    }
    
    NSMethodSignature *signature = [bridgeClass methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = bridgeClass;
    invocation.selector = selector;
    [invocation setArgument:&application atIndex:2];
    [invocation invoke];
}

@end
