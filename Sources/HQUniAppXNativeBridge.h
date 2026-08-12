//
//  HQUniAppXNativeBridge.h
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HQUniAppXNativeBridgeJSExport <JSExport>

- (NSDictionary *)getPublicParams;
- (NSDictionary *)getLaunchParams;
JSExportAs(handleAction, - (void)handleAction:(NSString *)action params:(nullable NSDictionary *)params);
- (void)handlePage:(NSString *)page;
- (NSString *)getPublicParamsJSON;
- (NSString *)getLaunchParamsJSON;
JSExportAs(handleActionJSON, - (void)handleActionJSON:(NSString *)action paramsJSON:(NSString *)paramsJSON);
- (void)handlePageSwift:(NSString *)page;

@end

@interface HQUniAppXNativeBridge : NSObject <HQUniAppXNativeBridgeJSExport>

+ (void)setupJSBridge;
+ (void)registerGlobalObjectIfNeeded;
+ (NSDictionary *)getPublicParams;
+ (NSDictionary *)getLaunchParams;
+ (void)handleAction:(NSString *)action params:(nullable NSDictionary *)params;
+ (void)handlePage:(NSString *)page;

@end

NS_ASSUME_NONNULL_END
