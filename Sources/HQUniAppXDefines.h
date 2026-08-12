//
//  HQUniAppXDefines.h
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN NSString * const HQUniAppXAppId;
FOUNDATION_EXTERN NSString * const HQUniAppXRouterPagePath;
FOUNDATION_EXTERN NSString * const HQUniAppXErrorDomain;
FOUNDATION_EXTERN NSString * const HQUniAppXBridgeStartNotification;
FOUNDATION_EXTERN NSString * const HQUniAppXNativeActionNotification;

typedef NS_ENUM(NSInteger, HQUniAppXErrorCode) {
    HQUniAppXErrorCodeRuntimeMissing = 1001,
    HQUniAppXErrorCodeInvalidParameter = 1002,
    HQUniAppXErrorCodeStartFailed = 1003,
};

NS_ASSUME_NONNULL_END
