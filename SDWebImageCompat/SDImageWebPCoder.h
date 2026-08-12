#import <Foundation/Foundation.h>
#import "SDImageCoder.h"

@interface SDImageWebPCoder : NSObject <SDProgressiveImageCoder>

@property (nonatomic, class, readonly, nonnull) SDImageWebPCoder *sharedCoder;

@end
