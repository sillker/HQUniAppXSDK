#import "SDImageWebPCoder.h"
#import "NSData+ImageContentType.h"
#import "SDImageCoder.h"
#import "UIImage+Metadata.h"
#import <ImageIO/ImageIO.h>

@interface SDImageWebPCoder ()

@property (nonatomic, strong) NSMutableData *incrementalData;
@property (nonatomic, assign) CGFloat incrementalScale;

@end

@implementation SDImageWebPCoder

+ (instancetype)sharedCoder {
    static SDImageWebPCoder *coder;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        coder = [[SDImageWebPCoder alloc] init];
    });
    return coder;
}

- (BOOL)canDecodeFromData:(NSData *)data {
    return data.length > 0 && [NSData sd_imageFormatForImageData:data] == SDImageFormatWebP;
}

- (UIImage *)decodedImageWithData:(NSData *)data options:(SDImageCoderOptions *)options {
    if (![self canDecodeFromData:data]) {
        return nil;
    }
    
    CGFloat scale = 1;
    NSNumber *scaleFactor = options[SDImageCoderDecodeScaleFactor];
    if (scaleFactor != nil) {
        scale = MAX(scaleFactor.doubleValue, 1);
    }
    
    CGImageSourceRef source = CGImageSourceCreateWithData((__bridge CFDataRef)data, NULL);
    if (!source) {
        return nil;
    }
    
    CGImageRef imageRef = CGImageSourceCreateImageAtIndex(source, 0, NULL);
    CFRelease(source);
    if (!imageRef) {
        return nil;
    }
    
#if SD_UIKIT || SD_WATCH
    UIImage *image = [[UIImage alloc] initWithCGImage:imageRef scale:scale orientation:UIImageOrientationUp];
#else
    UIImage *image = [[UIImage alloc] initWithCGImage:imageRef size:NSZeroSize];
#endif
    CGImageRelease(imageRef);
    image.sd_imageFormat = SDImageFormatWebP;
    return image;
}

- (BOOL)canEncodeToFormat:(SDImageFormat)format {
    return NO;
}

- (NSData *)encodedDataWithImage:(UIImage *)image format:(SDImageFormat)format options:(SDImageCoderOptions *)options {
    return nil;
}

- (BOOL)canIncrementalDecodeFromData:(NSData *)data {
    return [self canDecodeFromData:data];
}

- (instancetype)initIncrementalWithOptions:(SDImageCoderOptions *)options {
    self = [super init];
    if (self) {
        _incrementalData = [NSMutableData data];
        NSNumber *scaleFactor = options[SDImageCoderDecodeScaleFactor];
        _incrementalScale = scaleFactor != nil ? MAX(scaleFactor.doubleValue, 1) : 1;
    }
    return self;
}

- (void)updateIncrementalData:(NSData *)data finished:(BOOL)finished {
    [self.incrementalData setLength:0];
    if (data.length > 0) {
        [self.incrementalData appendData:data];
    }
}

- (UIImage *)incrementalDecodedImageWithOptions:(SDImageCoderOptions *)options {
    NSMutableDictionary *decodeOptions = [NSMutableDictionary dictionaryWithDictionary:options ?: @{}];
    decodeOptions[SDImageCoderDecodeScaleFactor] = @(self.incrementalScale);
    return [self decodedImageWithData:self.incrementalData options:decodeOptions];
}

@end
