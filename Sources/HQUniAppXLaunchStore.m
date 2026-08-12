//
//  HQUniAppXLaunchStore.m
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import "HQUniAppXLaunchStore.h"

static NSString * const HQUniAppXLaunchParamsDefaultsKey = @"HQUniAppXLaunchParamsDefaultsKey";

@interface HQUniAppXLaunchStore ()
@property (nonatomic, copy) NSString *targetUrl;
@property (nonatomic, copy) NSDictionary *targetParams;
@end

@implementation HQUniAppXLaunchStore

+ (instancetype)sharedStore
{
    static HQUniAppXLaunchStore *store;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        store = [[HQUniAppXLaunchStore alloc] init];
    });
    return store;
}

- (void)saveTargetUrl:(NSString *)targetUrl targetParams:(NSDictionary *)targetParams
{
    @synchronized (self) {
        self.targetUrl = targetUrl ?: @"";
        self.targetParams = [self normalizedDictionary:targetParams ?: @{}];
        [[NSUserDefaults standardUserDefaults] setObject:[self currentLaunchParams] forKey:HQUniAppXLaunchParamsDefaultsKey];
        [[NSUserDefaults standardUserDefaults] synchronize];
    }
}

- (NSDictionary *)currentLaunchParams
{
    @synchronized (self) {
        return @{
            @"targetUrl" : self.targetUrl ?: @"",
            @"targetParams" : self.targetParams ?: @{}
        };
    }
}

- (void)clear
{
    @synchronized (self) {
        self.targetUrl = nil;
        self.targetParams = nil;
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:HQUniAppXLaunchParamsDefaultsKey];
        [[NSUserDefaults standardUserDefaults] synchronize];
    }
}

- (NSDictionary *)normalizedDictionary:(NSDictionary *)dictionary
{
    NSMutableDictionary *result = [NSMutableDictionary dictionaryWithCapacity:dictionary.count];
    [dictionary enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        NSString *keyString = [key isKindOfClass:NSString.class] ? key : [key description];
        if (!keyString.length || obj == nil || obj == NSNull.null) {
            return;
        }
        if ([obj isKindOfClass:NSDictionary.class]) {
            result[keyString] = [self normalizedDictionary:obj];
        } else if ([obj isKindOfClass:NSArray.class]) {
            NSMutableArray *array = [NSMutableArray array];
            for (id item in (NSArray *)obj) {
                if ([item isKindOfClass:NSDictionary.class]) {
                    [array addObject:[self normalizedDictionary:item]];
                } else if (item && item != NSNull.null) {
                    [array addObject:[item description] ?: @""];
                }
            }
            result[keyString] = array.copy;
        } else if ([obj isKindOfClass:NSString.class]) {
            result[keyString] = obj;
        } else {
            result[keyString] = [obj description] ?: @"";
        }
    }];
    return result.copy;
}

@end
