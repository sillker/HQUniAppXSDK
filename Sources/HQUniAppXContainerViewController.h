//
//  HQUniAppXContainerViewController.h
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HQUniAppXContainerViewController : UIViewController

@property (nonatomic, strong, readonly) UIViewController *contentViewController;

- (instancetype)initWithContentViewController:(UIViewController *)contentViewController;

@end

NS_ASSUME_NONNULL_END
