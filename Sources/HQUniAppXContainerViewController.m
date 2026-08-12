//
//  HQUniAppXContainerViewController.m
//  HQUniAppXSDK
//
//  Created by Codex on 2026/7/10.
//

#import "HQUniAppXContainerViewController.h"

@interface HQUniAppXContainerViewController ()
@property (nonatomic, strong, readwrite) UIViewController *contentViewController;
@end

@implementation HQUniAppXContainerViewController

- (instancetype)initWithContentViewController:(UIViewController *)contentViewController
{
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        _contentViewController = contentViewController;
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.view.backgroundColor = UIColor.whiteColor;
    if (self.contentViewController) {
        [self addChildViewController:self.contentViewController];
        self.contentViewController.view.frame = self.view.bounds;
        self.contentViewController.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        [self.view addSubview:self.contentViewController.view];
        [self.contentViewController didMoveToParentViewController:self];
    }
}

- (BOOL)shouldAutorotate
{
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
    return UIInterfaceOrientationMaskLandscape;
}

- (BOOL)prefersHomeIndicatorAutoHidden
{
    return YES;
}

@end
