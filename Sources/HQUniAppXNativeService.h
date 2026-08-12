//
//  HQUniAppXNativeService.h
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HQUniAppXNativeService : NSObject

+ (instancetype)sharedService;

- (NSDictionary *)getPublicParams;
- (NSDictionary *)getLaunchParams;
- (void)handleAction:(NSString *)action params:(NSDictionary *)params;
- (void)handlePage:(NSString *)page;
- (NSInteger)getBuyTypeWithGoodsId:(NSInteger)goodsId;

@end

NS_ASSUME_NONNULL_END
