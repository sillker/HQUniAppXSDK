//
//  HQUniAppXRouter.m
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import "HQUniAppXRouter.h"
#import "HQUniAppXBridge.h"
#import "HQUniAppXDefines.h"
#import "HQUniAppXLaunchStore.h"

static NSString * const HQUniAppXEnableKey = @"HQUniAppXEnableKey";

@implementation HQUniAppXRouter

+ (BOOL)enableUniAppX
{
#ifdef HQ_PAD_HD
#ifdef DEBUG
    return YES;
#else
    id value = [[NSUserDefaults standardUserDefaults] objectForKey:HQUniAppXEnableKey];
    if (value == nil) {
        return YES;
    }
    return [[NSUserDefaults standardUserDefaults] boolForKey:HQUniAppXEnableKey];
#endif
#else
    return NO;
#endif
}

+ (void)setEnableUniAppX:(BOOL)enable
{
    [[NSUserDefaults standardUserDefaults] setBool:enable forKey:HQUniAppXEnableKey];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

+ (BOOL)openWithTargetUrl:(NSString *)targetUrl
             targetParams:(NSDictionary *)targetParams
                   fromVC:(UIViewController *)fromVC
                    error:(NSError **)error
{
    if (![self enableUniAppX]) {
        if (error) {
            *error = [NSError errorWithDomain:HQUniAppXErrorDomain code:HQUniAppXErrorCodeStartFailed userInfo:@{NSLocalizedDescriptionKey : @"UniAppX is disabled by local switch"}];
        }
        return NO;
    }
    if (!targetUrl.length) {
        if (error) {
            *error = [NSError errorWithDomain:HQUniAppXErrorDomain code:HQUniAppXErrorCodeInvalidParameter userInfo:@{NSLocalizedDescriptionKey : @"targetUrl is empty"}];
        }
        return NO;
    }
    
    [[HQUniAppXLaunchStore sharedStore] saveTargetUrl:targetUrl targetParams:targetParams ?: @{}];
#ifdef DEBUG
    NSLog(@"[HQUniAppX] open targetUrl:%@ params:%@", targetUrl, targetParams ?: @{});
#endif
    return [HQUniAppXBridge startFromViewController:fromVC error:error];
}

+ (BOOL)openStudyReportFrom:(UIViewController *)fromVC
                    goodsId:(NSInteger)goodsId
                 categoryId:(NSInteger)categoryId
                  productId:(NSInteger)productId
                     isWeek:(BOOL)isWeek
                      error:(NSError **)error
{
    NSDictionary *params = @{
        @"goodsId" : @(goodsId).stringValue,
        @"categoryId" : @(categoryId).stringValue,
        @"productId" : @(productId).stringValue,
        @"tabIndex" : isWeek ? @"1" : @"0",
        @"isAl" : @"1"
    };
    return [self openWithTargetUrl:@"/pages/study-report/index" targetParams:params fromVC:fromVC error:error];
}

+ (BOOL)openTopicFrom:(UIViewController *)fromVC
              goodsId:(NSInteger)goodsId
           categoryId:(NSInteger)categoryId
            productId:(NSInteger)productId
                error:(NSError **)error
{
    NSDictionary *params = @{
        @"goodsId" : @(goodsId).stringValue,
        @"categoryId" : @(categoryId).stringValue,
        @"productId" : @(productId).stringValue,
        @"isAl" : @"1"
    };
    return [self openWithTargetUrl:@"/pages/topic/index" targetParams:params fromVC:fromVC error:error];
}

+ (BOOL)openChapterTopicFrom:(UIViewController *)fromVC
                     goodsId:(NSInteger)goodsId
                  categoryId:(NSInteger)categoryId
                   productId:(NSInteger)productId
                       error:(NSError **)error
{
    NSDictionary *params = @{
        @"goodsId" : @(goodsId).stringValue,
        @"categoryId" : @(categoryId).stringValue,
        @"productId" : @(productId).stringValue
    };
    return [self openWithTargetUrl:@"/pages/topic/chapter" targetParams:params fromVC:fromVC error:error];
}

+ (BOOL)openNoteFrom:(UIViewController *)fromVC
             goodsId:(NSInteger)goodsId
          categoryId:(NSInteger)categoryId
           productId:(NSInteger)productId
                isAl:(NSInteger)isAl
             buyType:(NSInteger)buyType
               error:(NSError **)error
{
    NSDictionary *params = @{
        @"goodsId" : @(goodsId).stringValue,
        @"categoryId" : @(categoryId).stringValue,
        @"productId" : @(productId).stringValue,
        @"buyType" : @(buyType).stringValue,
        @"isAl" : @(isAl).stringValue
    };
    return [self openWithTargetUrl:@"/pages/note/index" targetParams:params fromVC:fromVC error:error];
}

+ (BOOL)openQuestionAnsFrom:(UIViewController *)fromVC
                    goodsId:(NSInteger)goodsId
                 categoryId:(NSInteger)categoryId
                  productId:(NSInteger)productId
                       isAl:(NSInteger)isAl
                    buyType:(NSInteger)buyType
                      error:(NSError **)error
{
    NSDictionary *params = @{
        @"goodsId" : @(goodsId).stringValue,
        @"categoryId" : @(categoryId).stringValue,
        @"productId" : @(productId).stringValue,
        @"buyType" : @(buyType).stringValue,
        @"isAl" : @(isAl).stringValue
    };
    return [self openWithTargetUrl:@"/pages/question-ans/index" targetParams:params fromVC:fromVC error:error];
}

@end
