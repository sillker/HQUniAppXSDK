//
//  HQUniAppXRouter.h
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HQUniAppXRouter : NSObject

+ (BOOL)enableUniAppX;
+ (void)setEnableUniAppX:(BOOL)enable;

+ (BOOL)openWithTargetUrl:(NSString *)targetUrl
             targetParams:(NSDictionary *)targetParams
                   fromVC:(UIViewController *)fromVC
                    error:(NSError **)error;

+ (BOOL)openStudyReportFrom:(UIViewController *)fromVC
                    goodsId:(NSInteger)goodsId
                 categoryId:(NSInteger)categoryId
                  productId:(NSInteger)productId
                     isWeek:(BOOL)isWeek
                      error:(NSError **)error;

+ (BOOL)openTopicFrom:(UIViewController *)fromVC
              goodsId:(NSInteger)goodsId
           categoryId:(NSInteger)categoryId
            productId:(NSInteger)productId
                error:(NSError **)error;

+ (BOOL)openChapterTopicFrom:(UIViewController *)fromVC
                     goodsId:(NSInteger)goodsId
                  categoryId:(NSInteger)categoryId
                   productId:(NSInteger)productId
                       error:(NSError **)error;

+ (BOOL)openNoteFrom:(UIViewController *)fromVC
             goodsId:(NSInteger)goodsId
          categoryId:(NSInteger)categoryId
           productId:(NSInteger)productId
                isAl:(NSInteger)isAl
             buyType:(NSInteger)buyType
               error:(NSError **)error;

+ (BOOL)openQuestionAnsFrom:(UIViewController *)fromVC
                    goodsId:(NSInteger)goodsId
                 categoryId:(NSInteger)categoryId
                  productId:(NSInteger)productId
                       isAl:(NSInteger)isAl
                    buyType:(NSInteger)buyType
                      error:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
