//
//  HQUniAppXNativeBridge.m
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import "HQUniAppXNativeBridge.h"
#import "HQUniAppXNativeService.h"
#import <DCloudUniappRuntime/UniJsBridgeImpl.h>

@interface HQUniAppXNativeBridge () <UniJsBridgeHook>

+ (instancetype)sharedBridge;
+ (NSString *)jsonStringFromDictionary:(NSDictionary *)dictionary;
+ (NSDictionary *)dictionaryFromJSONString:(NSString *)jsonString;

@end

@implementation HQUniAppXNativeBridge

+ (void)setupJSBridge
{
    UniJsBridgeImpl *bridge = [UniJsBridgeImpl shared];
    [bridge registerHookWithClassName:NSStringFromClass(self)];
    [self registerGlobalObjectIfNeeded];
}

+ (void)registerGlobalObjectIfNeeded
{
    UniJsBridgeImpl *bridge = [UniJsBridgeImpl shared];
    [bridge registerGlobalObject:[HQUniAppXNativeBridge sharedBridge] forName:@"HQWXDataIOSBridge"];
    [bridge registerGlobalObject:[HQUniAppXNativeBridge sharedBridge] forName:@"HQUniAppXNativeBridge"];
}

+ (instancetype)sharedBridge
{
    static HQUniAppXNativeBridge *bridge;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        bridge = [[HQUniAppXNativeBridge alloc] init];
    });
    return bridge;
}

+ (NSDictionary *)getPublicParams
{
    return [[HQUniAppXNativeService sharedService] getPublicParams];
}

+ (NSDictionary *)getLaunchParams
{
    return [[HQUniAppXNativeService sharedService] getLaunchParams];
}

+ (void)handleAction:(NSString *)action params:(NSDictionary *)params
{
    [[HQUniAppXNativeService sharedService] handleAction:action params:params];
}

+ (void)handlePage:(NSString *)page
{
    [[HQUniAppXNativeService sharedService] handlePage:page];
}

- (NSDictionary *)getPublicParams
{
    return [HQUniAppXNativeBridge getPublicParams];
}

- (NSDictionary *)getLaunchParams
{
    return [HQUniAppXNativeBridge getLaunchParams];
}

- (void)handleAction:(NSString *)action params:(NSDictionary *)params
{
    [HQUniAppXNativeBridge handleAction:action params:params];
}

- (void)handlePage:(NSString *)page
{
    [HQUniAppXNativeBridge handlePage:page];
}

- (NSString *)getPublicParamsJSON
{
    return [HQUniAppXNativeBridge jsonStringFromDictionary:[HQUniAppXNativeBridge getPublicParams]];
}

- (NSString *)getLaunchParamsJSON
{
    return [HQUniAppXNativeBridge jsonStringFromDictionary:[HQUniAppXNativeBridge getLaunchParams]];
}

- (void)handleActionJSON:(NSString *)action paramsJSON:(NSString *)paramsJSON
{
    NSDictionary *params = [HQUniAppXNativeBridge dictionaryFromJSONString:paramsJSON];
    [HQUniAppXNativeBridge handleAction:action params:params];
}

- (void)handlePageSwift:(NSString *)page
{
    [HQUniAppXNativeBridge handlePage:page];
}

- (void)create:(UniJsBridgeImpl *)jsBridge
{
    [jsBridge registerGlobalObject:[HQUniAppXNativeBridge sharedBridge] forName:@"HQWXDataIOSBridge"];
    [jsBridge registerGlobalObject:[HQUniAppXNativeBridge sharedBridge] forName:@"HQUniAppXNativeBridge"];
#ifdef DEBUG
    NSLog(@"[HQUniAppX] register JS global bridge object");
#endif
}

- (void)onPageDestory:(NSString *)pageId
{
}

- (void)destory:(UniJsBridgeImpl *)jsBridge
{
}

+ (NSString *)jsonStringFromDictionary:(NSDictionary *)dictionary
{
    NSDictionary *safeDictionary = [dictionary isKindOfClass:NSDictionary.class] ? dictionary : @{};
    if (![NSJSONSerialization isValidJSONObject:safeDictionary]) {
        return @"{}";
    }
    NSData *data = [NSJSONSerialization dataWithJSONObject:safeDictionary options:0 error:nil];
    if (!data.length) {
        return @"{}";
    }
    NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    return string.length ? string : @"{}";
}

+ (NSDictionary *)dictionaryFromJSONString:(NSString *)jsonString
{
    if (![jsonString isKindOfClass:NSString.class] || !jsonString.length) {
        return @{};
    }
    NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    if (!data.length) {
        return @{};
    }
    id object = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    return [object isKindOfClass:NSDictionary.class] ? object : @{};
}

@end
