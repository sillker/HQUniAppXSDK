//
//  HQUniAppXBridge.h
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HQUniAppXBridge : NSObject

+ (void)setup;
+ (void)didFinishLaunching:(UIApplication *)application options:(nullable NSDictionary *)launchOptions;
+ (void)applicationWillResignActive:(UIApplication *)application;
+ (void)applicationDidBecomeActive:(UIApplication *)application;
+ (void)applicationDidEnterBackground:(UIApplication *)application;
+ (void)applicationWillEnterForeground:(UIApplication *)application;
+ (BOOL)openURL:(NSURL *)url options:(NSDictionary *)options;
+ (BOOL)continueUserActivity:(NSUserActivity *)userActivity;
+ (BOOL)isRuntimeAvailable;
+ (BOOL)startFromViewController:(UIViewController *)viewController error:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
