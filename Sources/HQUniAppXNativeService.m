//
//  HQUniAppXNativeService.m
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import "HQUniAppXNativeService.h"
#import "HQUniAppXDefines.h"
#import "HQUniAppXLaunchStore.h"
#import <UIKit/UIKit.h>

@implementation HQUniAppXNativeService

+ (instancetype)sharedService
{
    static HQUniAppXNativeService *service;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        service = [[HQUniAppXNativeService alloc] init];
    });
    return service;
}

- (NSDictionary *)getPublicParams
{
    NSString *token = [self userDefaultStringForKey:@"hq_token"] ?: @"";
    NSString *appId = [self baseConfigStringForKey:@"appId"] ?: @"edu24olapp";
    NSString *orgId = [self baseConfigStringForKey:@"orgId"] ?: @"2";
    NSString *schId = [self baseConfigStringForKey:@"schId"] ?: @"2";
    NSString *pschId = [self baseConfigStringForKey:@"pschId"] ?: @"14";
    NSString *version = [self baseConfigStringForKey:@"versionApp"] ?: @"1.0.0";
    NSString *timestamp = [NSString stringWithFormat:@"%lld", (long long)([[NSDate date] timeIntervalSince1970] * 1000)];
    return @{
        @"appid" : appId,
        @"_appid" : appId,
        @"org_id" : orgId,
        @"schId" : schId,
        @"pschId" : pschId,
        @"platform" : @"ios",
        @"_os" : @"2",
        @"_v" : version,
        @"_t" : timestamp,
        @"edu24ol_token" : token,
        @"passport" : token
    };
}

- (NSDictionary *)getLaunchParams
{
    return [[HQUniAppXLaunchStore sharedStore] currentLaunchParams];
}

- (void)handleAction:(NSString *)action params:(NSDictionary *)params
{
    if (!action.length) {
        return;
    }
    
    NSDictionary *safeParams = params ?: @{};
#ifdef DEBUG
    NSLog(@"[HQUniAppXNativeService] handleAction:%@ params:%@", action, safeParams);
#endif
    [[NSNotificationCenter defaultCenter] postNotificationName:HQUniAppXNativeActionNotification object:nil userInfo:@{
        @"action" : action,
        @"params" : safeParams
    }];
    
    if ([action isEqualToString:@"handleCourseNoteItemClick"]) {
        [self gotoSeatwork:safeParams action:action];
    } else if ([action isEqualToString:@"handleQuestionNoteItemClick"]) {
        [self gotoSeatwork:safeParams action:action];
    } else if ([action isEqualToString:@"handleChapterExercise"]) {
        [self gotoSeatwork:safeParams action:action];
    } else if ([action isEqualToString:@"handleCustomExercise"]) {
        [self gotoSeatwork:safeParams action:action];
    }
    else {
        [self showPendingNativeAction:@"暂不支持" params:params];
    }
}

- (void)handlePage:(NSString *)page
{
    if (!page.length) {
        return;
    }
#ifdef DEBUG
    NSLog(@"[HQUniAppXNativeService] handlePage:%@", page);
#endif
    [[NSNotificationCenter defaultCenter] postNotificationName:HQUniAppXNativeActionNotification object:nil userInfo:@{
        @"action" : @"handlePage",
        @"page" : page
    }];
    [self runOnMainThread:^{
        if ([self handleAppPage:page]) {
            return;
        }
        [self openNativePage:page params:@{}];
    }];
}

//- (NSInteger)getBuyTypeWithGoodsId:(NSInteger)goodsId
//{
//    Class managerClass = NSClassFromString(@"GZXXListBuyGoodsByUidManager");
//    SEL selector = NSSelectorFromString(@"localFromGoodId:withGoodGroupId:");
//    if (managerClass && [managerClass respondsToSelector:selector]) {
//        NSMethodSignature *signature = [managerClass methodSignatureForSelector:selector];
//        NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
//        invocation.target = managerClass;
//        invocation.selector = selector;
//        NSInteger groupId = 0;
//        [invocation setArgument:&goodsId atIndex:2];
//        [invocation setArgument:&groupId atIndex:3];
//        [invocation invoke];
//        __unsafe_unretained id model = nil;
//        [invocation getReturnValue:&model];
//        if ([model respondsToSelector:NSSelectorFromString(@"buyType")]) {
//            return [[model valueForKey:@"buyType"] integerValue];
//        }
//    }
//    return 0;
//}


- (void)gotoSeatwork:(NSDictionary *)params action:(NSString *)action
{
    [self runOnMainThread:^{
        NSMutableDictionary *dict = @{@"action":action? :@""}.mutableCopy;
        if (params) {
            dict[@"actionParams"] = params;
        }
        if ([HQUniAppXLaunchStore sharedStore].currentLaunchParams) {
            dict[@"currentLaunchParams"] = [HQUniAppXLaunchStore sharedStore].currentLaunchParams;
        }
        if ([self openNativePage:@"hqwx://GZXXUniappEventTool" params:dict]) {
            return;
        }
    }];
}

- (void)showPendingNativeAction:(NSString *)message params:(NSDictionary *)params
{
#ifdef DEBUG
    NSLog(@"[HQUniAppXNativeService] %@ params:%@", message, params);
#endif
}

- (BOOL)openNativePage:(NSString *)page params:(NSDictionary *)params
{
    if (!page.length) {
        return NO;
    }
    NSString *route = page;
    if (![route containsString:@"://"]) {
        route = [NSString stringWithFormat:@"hqwx://%@", route];
    }
    
    Class baseRouter = NSClassFromString(@"HQWXBaseRouter");
    SEL baseSelector = NSSelectorFromString(@"router_HandleForOpenEvent:param:");
    if (baseRouter && [baseRouter respondsToSelector:baseSelector]) {
        NSMethodSignature *signature = [baseRouter methodSignatureForSelector:baseSelector];
        NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
        invocation.target = baseRouter;
        invocation.selector = baseSelector;
        NSDictionary *safeParams = params ?: @{};
        [invocation setArgument:&route atIndex:2];
        [invocation setArgument:&safeParams atIndex:3];
        [invocation invoke];
        return YES;
    }
    
    Class routerManager = NSClassFromString(@"HQWXRouterManager");
    SEL managerSelector = NSSelectorFromString(@"openCommonUrl:withUserInfo:completion:");
    if (routerManager && [routerManager respondsToSelector:managerSelector]) {
        NSMethodSignature *signature = [routerManager methodSignatureForSelector:managerSelector];
        NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
        invocation.target = routerManager;
        invocation.selector = managerSelector;
        NSDictionary *safeParams = params ?: @{};
        id completion = nil;
        [invocation setArgument:&route atIndex:2];
        [invocation setArgument:&safeParams atIndex:3];
        [invocation setArgument:&completion atIndex:4];
        [invocation invoke];
        return YES;
    }
    
    return NO;
}

- (BOOL)handleAppPage:(NSString *)page
{
    NSURLComponents *components = [NSURLComponents componentsWithString:page];
    NSString *host = components.host ?: @"";
    NSString *path = components.path ?: @"";
    NSString *route = path.length ? [host stringByAppendingString:path] : host;
    NSDictionary *params = [self currentLaunchTargetParams];
    NSMutableDictionary *mergedParams = [params mutableCopy] ?: [NSMutableDictionary dictionary];
    for (NSURLQueryItem *item in components.queryItems) {
        if (item.name.length && item.value) {
            mergedParams[item.name] = item.value;
        }
    }
#ifdef DEBUG
    NSLog(@"[HQUniAppXNativeService] app route:%@ params:%@", route, mergedParams.copy);
#endif
    
    if ([route isEqualToString:@"uniappx/back"]) {
        [self closeUniAppXPage];
        return YES;
    }
    if ([route isEqualToString:@"cspro/questionCollect"]) {
        [self openQuestionCollectionWithParams:mergedParams.copy];
        return YES;
    }
    if ([route isEqualToString:@"cspro/questionRecordList"]) {
        [self openQuestionRecordWithParams:mergedParams.copy];
        return YES;
    }
    if ([route isEqualToString:@"cspro/homeworkList"]) {
        [self openQuestionHomeWorkWithParams:mergedParams.copy];
        return YES;
    }
    if ([route isEqualToString:@"cspro/wrongQuestionSet"]) {
        [self openWrongQuestionSetWithParams:mergedParams.copy];
        return YES;
    }
    if ([route isEqualToString:@"cspro/doAllWrongQuestionList"]) {
        [self gotoSeatwork:mergedParams action:route];
        return YES;
    }
    if ([route isEqualToString:@"cspro/frequencyErrorQuestionList"]) {
        [self openFrequencyErrorQuestionListWithParams:mergedParams.copy];
        return YES;
    }
    if ([route isEqualToString:@"cspro/specialList"]) {
        [self openQuestionExerciseListWithParams:mergedParams.copy type:2 typeName:@"专项训练"];
        return YES;
    }
    if ([route isEqualToString:@"cspro/paperList"]) {
        NSInteger paperType = [self integerValueFromParams:mergedParams keys:@[@"type"] defaultValue:2];
        if (paperType == 3) {
            [self openQuestionMockPaperWithParams:mergedParams.copy];
        } else {
            [self openQuestionExerciseListWithParams:mergedParams.copy type:3 typeName:@"历年真题"];
        }
        return YES;
    }
    if ([route isEqualToString:@"cspro/photoSearch"]) {
        [self openPhotoSearchWithParams:mergedParams.copy];
        return YES;
    }
    return NO;
}

- (void)openQuestionCollectionWithParams:(NSDictionary *)params
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        [self showPendingNativeAction:@"收藏夹跳转失败：ProductBasicModel 不可用" params:params];
        return;
    }
    [self openNativePage:@"hqwx://YSS7_QuestionCollectionContainVC" params:@{
        @"ProductBasicModel" : basicModel
    }];
}

- (void)openQuestionRecordWithParams:(NSDictionary *)params
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        [self showPendingNativeAction:@"做题记录跳转失败：ProductBasicModel 不可用" params:params];
        return;
    }
    
    Class recordClass = NSClassFromString(@"YSS_QuestionRecordMainVC");
    SEL selector = NSSelectorFromString(@"pushRecordListWithBasicModel:currentVC:");
    if (!recordClass || ![recordClass respondsToSelector:selector]) {
        [self showPendingNativeAction:@"做题记录跳转失败：YSS_QuestionRecordMainVC 不可用" params:params];
        return;
    }
    
    UIViewController *topVC = [self topViewController];
    NSMethodSignature *signature = [recordClass methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = recordClass;
    invocation.selector = selector;
    [invocation setArgument:&basicModel atIndex:2];
    [invocation setArgument:&topVC atIndex:3];
    [invocation invoke];
}

- (void)openQuestionHomeWorkWithParams:(NSDictionary *)params
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        [self showPendingNativeAction:@"课后作业跳转失败：ProductBasicModel 不可用" params:params];
        return;
    }
    [self openNativePage:@"hqwx://YSS7_QuestionHomeWorkVC" params:@{
        @"ProductBasicModel" : basicModel
    }];
}

- (void)openWrongQuestionSetWithParams:(NSDictionary *)params
{
    NSDictionary *routerParams = [self questionCategoryRouterParamsWithParams:params];
    if (!routerParams.count) {
        [self showPendingNativeAction:@"错题本跳转失败：参数不可用" params:params];
        return;
    }
    [self openNativePage:@"hqwx://YSS7_QuestionErrorContainVC" params:routerParams];
}

- (void)openFrequencyErrorQuestionListWithParams:(NSDictionary *)params
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        [self showPendingNativeAction:@"高频易错跳转失败：ProductBasicModel 不可用" params:params];
        return;
    }
    NSInteger type = [self integerValueFromParams:params keys:@[@"type"] defaultValue:1];
    [self openNativePage:@"hqwx://YSS7_QuestionErrorProneListVC" params:@{
        @"ProductBasicModel" : basicModel,
        @"type" : @(type)
    }];
}

- (void)openQuestionExerciseListWithParams:(NSDictionary *)params type:(NSInteger)type typeName:(NSString *)typeName
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        [self showPendingNativeAction:@"题集子列表跳转失败：ProductBasicModel 不可用" params:params];
        return;
    }
    [self openNativePage:@"hqwx://YSS7_QuestionExerciseListVC" params:@{
        @"ProductBasicModel" : basicModel,
        @"searchQuestionModel" : @([self integerValueFromParams:params keys:@[@"searchQuestionModel"] defaultValue:1]),
        @"type" : @(type),
        @"typeName" : typeName ?: @""
    }];
}

- (void)openQuestionMockPaperWithParams:(NSDictionary *)params
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        [self showPendingNativeAction:@"模考精测跳转失败：ProductBasicModel 不可用" params:params];
        return;
    }
    [self openNativePage:@"hqwx://YSS7_QuestionMockAndPaperVC" params:@{
        @"ProductBasicModel" : basicModel,
        @"searchQuestionModel" : @([self integerValueFromParams:params keys:@[@"searchQuestionModel"] defaultValue:1]),
        @"type" : @4,
        @"typeName" : @"模考精测"
    }];
}

- (void)openPhotoSearchWithParams:(NSDictionary *)params
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        [self showPendingNativeAction:@"拍题答疑跳转失败：ProductBasicModel 不可用" params:params];
        return;
    }
    [self openNativePage:@"hqwx://YSS7_SnapSearchVC" params:@{
        @"ProductBasicModel" : basicModel
    }];
}

- (void)closeUniAppXPage
{
    Class runtimeBridgeClass = NSClassFromString(@"HQUniAppXRuntimeBridge");
    SEL exitSelector = NSSelectorFromString(@"exit");
    if (runtimeBridgeClass && [runtimeBridgeClass respondsToSelector:exitSelector]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [runtimeBridgeClass performSelector:exitSelector];
#pragma clang diagnostic pop
        return;
    }
    
    UIViewController *topVC = [self topViewController];
    if (topVC.navigationController.viewControllers.count > 1) {
        [topVC.navigationController popViewControllerAnimated:YES];
        return;
    }
    if (topVC.presentingViewController) {
        [topVC dismissViewControllerAnimated:YES completion:nil];
    }
}

- (NSDictionary *)currentLaunchTargetParams
{
    NSDictionary *launchParams = [[HQUniAppXLaunchStore sharedStore] currentLaunchParams];
    id targetParams = launchParams[@"targetParams"];
    if ([targetParams isKindOfClass:NSDictionary.class]) {
        return [self normalizedDictionary:targetParams];
    }
    return @{};
}

- (NSDictionary *)questionCategoryRouterParamsWithParams:(NSDictionary *)params
{
    id basicModel = [self productBasicModelWithParams:params];
    if (!basicModel) {
        return @{};
    }
    NSInteger categoryId = [self integerValueFromParams:params keys:@[@"categoryId"] defaultValue:0];
    NSArray *categoryList = [self categoryListWithBasicModel:basicModel params:params];
    return @{
        @"ProductBasicModel" : basicModel,
        @"categoryList" : categoryList ?: @[],
        @"currentCategoryId" : @(categoryId)
    };
}

- (NSArray *)categoryListWithBasicModel:(id)basicModel params:(NSDictionary *)params
{
    Class categoryClass = NSClassFromString(@"CSP_UserCategoryModel");
    SEL selector = NSSelectorFromString(@"localCopyModeWithCategoryId:secondId:goodsId:");
    if (!categoryClass || ![categoryClass respondsToSelector:selector]) {
        return @[];
    }
    NSInteger categoryId = 0;
    NSInteger secondCategoryId = [self integerValueFromParams:params keys:@[@"secondCategoryId", @"secondCategory", @"secondId"] defaultValue:0];
    NSInteger goodsId = [self integerValueFromParams:params keys:@[@"goodsId"] defaultValue:0];
    if (secondCategoryId <= 0 && [basicModel respondsToSelector:NSSelectorFromString(@"secondCategoryId")]) {
        secondCategoryId = [[basicModel valueForKey:@"secondCategoryId"] integerValue];
    }
    if (goodsId <= 0 && [basicModel respondsToSelector:NSSelectorFromString(@"goodsId")]) {
        goodsId = [[basicModel valueForKey:@"goodsId"] integerValue];
    }
    
    NSMethodSignature *signature = [categoryClass methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = categoryClass;
    invocation.selector = selector;
    [invocation setArgument:&categoryId atIndex:2];
    [invocation setArgument:&secondCategoryId atIndex:3];
    [invocation setArgument:&goodsId atIndex:4];
    [invocation invoke];
    __unsafe_unretained id result = nil;
    [invocation getReturnValue:&result];
    return [result isKindOfClass:NSArray.class] ? result : @[];
}

- (UIViewController *)topViewController
{
    Class vcManager = NSClassFromString(@"HQ_VCManager");
    SEL topSelector = NSSelectorFromString(@"hq_topViewController");
    if (vcManager && [vcManager respondsToSelector:topSelector]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        id vc = [vcManager performSelector:topSelector];
#pragma clang diagnostic pop
        if ([vc isKindOfClass:UIViewController.class]) {
            return vc;
        }
    }
    UIViewController *rootVC = [self currentKeyWindow].rootViewController;
    while (rootVC.presentedViewController) {
        rootVC = rootVC.presentedViewController;
    }
    if ([rootVC isKindOfClass:UINavigationController.class]) {
        return [(UINavigationController *)rootVC topViewController];
    }
    if ([rootVC isKindOfClass:UITabBarController.class]) {
        UIViewController *selectedVC = [(UITabBarController *)rootVC selectedViewController];
        if ([selectedVC isKindOfClass:UINavigationController.class]) {
            return [(UINavigationController *)selectedVC topViewController];
        }
        return selectedVC;
    }
    return rootVC;
}

- (UIWindow *)currentKeyWindow
{
    if (@available(iOS 13.0, *)) {
        for (UIScene *scene in UIApplication.sharedApplication.connectedScenes) {
            if (![scene isKindOfClass:UIWindowScene.class] || scene.activationState != UISceneActivationStateForegroundActive) {
                continue;
            }
            for (UIWindow *window in ((UIWindowScene *)scene).windows) {
                if (window.isKeyWindow) {
                    return window;
                }
            }
        }
    }
    return UIApplication.sharedApplication.delegate.window;
}

- (id)productBasicModelWithParams:(NSDictionary *)params
{
    Class modelClass = NSClassFromString(@"ProductBasicModel");
    if (!modelClass) {
        return nil;
    }
    id model = [[modelClass alloc] init];
    [self safeSetInteger:[self integerValueFromParams:params keys:@[@"goodsId"] defaultValue:0] forKey:@"goodsId" object:model];
    [self safeSetInteger:[self integerValueFromParams:params keys:@[@"productId"] defaultValue:0] forKey:@"productId" object:model];
    [self safeSetInteger:[self integerValueFromParams:params keys:@[@"categoryId"] defaultValue:0] forKey:@"categoryId" object:model];
    [self safeSetInteger:[self integerValueFromParams:params keys:@[@"secondCategoryId", @"secondCategory", @"secondId"] defaultValue:0] forKey:@"secondCategoryId" object:model];
    [self safeSetBool:[[HQUniAppXLaunchStore sharedStore] isAl] forKey:@"isCSPVersion7" object:model];
    return model;
}

- (id)studyInfoModelWithObjId:(NSInteger)objId name:(NSString *)name type:(NSInteger)type
{
    Class modelClass = NSClassFromString(@"CSP_StudyInfoModel");
    SEL selector = NSSelectorFromString(@"crateModelWith:name:type:");
    if (!modelClass || ![modelClass respondsToSelector:selector]) {
        return nil;
    }
    NSMethodSignature *signature = [modelClass methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = modelClass;
    invocation.selector = selector;
    NSString *safeName = name ?: @"";
    [invocation setArgument:&objId atIndex:2];
    [invocation setArgument:&safeName atIndex:3];
    [invocation setArgument:&type atIndex:4];
    [invocation invoke];
    __unsafe_unretained id model = nil;
    [invocation getReturnValue:&model];
    return model;
}

- (NSString *)normalizedQuestionIdsFromParams:(NSDictionary *)params
{
    id value = nil;
    for (NSString *key in @[@"questionIds", @"questionIdList", @"quesitonIdList", @"qids", @"questionId"]) {
        value = params[key];
        if (value && value != NSNull.null) {
            break;
        }
    }
    if ([value isKindOfClass:NSString.class]) {
        return [(NSString *)value stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceAndNewlineCharacterSet];
    }
    if ([value isKindOfClass:NSNumber.class]) {
        return [(NSNumber *)value stringValue];
    }
    if ([value isKindOfClass:NSArray.class]) {
        NSMutableArray *ids = [NSMutableArray array];
        for (id item in (NSArray *)value) {
            if (item && item != NSNull.null) {
                [ids addObject:[item description]];
            }
        }
        return [ids componentsJoinedByString:@","];
    }
    return @"";
}

- (NSInteger)objectIdFromParams:(NSDictionary *)params
{
    NSInteger objId = [self integerValueFromParams:params keys:@[@"objId", @"knowledgeId", @"chapterId", @"lessonId"] defaultValue:0];
    return objId;
}

- (NSString *)stringValueFromParams:(NSDictionary *)params keys:(NSArray<NSString *> *)keys
{
    for (NSString *key in keys) {
        id value = params[key];
        if (!value || value == NSNull.null) {
            continue;
        }
        if ([value isKindOfClass:NSString.class]) {
            return value;
        }
        return [value description] ?: @"";
    }
    return @"";
}

- (NSInteger)integerValueFromParams:(NSDictionary *)params keys:(NSArray<NSString *> *)keys defaultValue:(NSInteger)defaultValue
{
    NSString *value = [self stringValueFromParams:params keys:keys];
    return value.length ? value.integerValue : defaultValue;
}

- (BOOL)boolValueFromParams:(NSDictionary *)params keys:(NSArray<NSString *> *)keys
{
    NSString *value = [self stringValueFromParams:params keys:keys];
    return value.boolValue;
}

- (NSDictionary *)normalizedDictionary:(NSDictionary *)dictionary
{
    NSMutableDictionary *result = [NSMutableDictionary dictionaryWithCapacity:dictionary.count];
    [dictionary enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        NSString *keyString = [key isKindOfClass:NSString.class] ? key : [key description];
        if (!keyString.length || obj == nil || obj == NSNull.null) {
            return;
        }
        result[keyString] = obj;
    }];
    return result.copy;
}

- (void)safeSetInteger:(NSInteger)value forKey:(NSString *)key object:(id)object
{
    @try {
        [object setValue:@(value) forKey:key];
    } @catch (__unused NSException *exception) {
    }
}

- (void)safeSetBool:(BOOL)value forKey:(NSString *)key object:(id)object
{
    @try {
        [object setValue:@(value) forKey:key];
    } @catch (__unused NSException *exception) {
    }
}

- (void)runOnMainThread:(dispatch_block_t)block
{
    if (!block) {
        return;
    }
    if (NSThread.isMainThread) {
        block();
    } else {
        dispatch_async(dispatch_get_main_queue(), block);
    }
}

- (NSString *)userDefaultStringForKey:(NSString *)key
{
    Class defaultsClass = NSClassFromString(@"GVUserDefaults");
    SEL selector = NSSelectorFromString(@"standardUserDefaults");
    NSString *value = nil;
    if (!defaultsClass || ![defaultsClass respondsToSelector:selector]) {
        value = nil;
    } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        id defaults = [defaultsClass performSelector:selector];
#pragma clang diagnostic pop
        id rawValue = nil;
        @try {
            rawValue = [defaults valueForKey:key];
        } @catch (__unused NSException *exception) {
            rawValue = nil;
        }
        value = [rawValue isKindOfClass:NSString.class] ? rawValue : nil;
    }
    if (value.length) {
        return value;
    }
    return nil;
}

- (NSString *)baseConfigStringForKey:(NSString *)key
{
    Class configClass = NSClassFromString(@"HQBaseConfig");
    SEL selector = NSSelectorFromString(@"shareInstance");
    if (!configClass || ![configClass respondsToSelector:selector]) {
        return nil;
    }
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
    id config = [configClass performSelector:selector];
#pragma clang diagnostic pop
    id value = nil;
    @try {
        value = [config valueForKey:key];
    } @catch (__unused NSException *exception) {
        value = nil;
    }
    if ([value isKindOfClass:NSString.class]) {
        return [(NSString *)value length] ? value : nil;
    }
    if ([value respondsToSelector:@selector(stringValue)]) {
        NSString *stringValue = [value stringValue];
        return stringValue.length ? stringValue : nil;
    }
    return nil;
}

@end
