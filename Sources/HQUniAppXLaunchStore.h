//
//  HQUniAppXLaunchStore.h
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HQUniAppXLaunchStore : NSObject

+ (instancetype)sharedStore;

- (void)saveTargetUrl:(NSString *)targetUrl targetParams:(NSDictionary *)targetParams;
- (NSDictionary *)currentLaunchParams;
- (void)clear;

@end

NS_ASSUME_NONNULL_END
