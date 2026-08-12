# HQUniAppXSDK

This local pod contains the Pad HD native bridge for UniAppX.

## Current State

The checked-in `Resources/uni-app-x/apps/__UNI__DF02813/www` directory is copied from the HBuilderX iOS resource export:

```text
/Users/sillker/Desktop/ios-uniappx-app-ios-4.87-__UNI__DF02813-bridge-fixed-20260714/unpackage/resources/app-ios/__UNI__DF02813/www
```

The DCloud iOS SDK is not checked in yet. Before enabling real runtime startup, add the DCloud 4.87 iOS SDK frameworks to `Frameworks/` and rebuild `DCloudUTSExtAPI.xcframework` following:

```text
https://doc.dcloud.net.cn/uni-app-x/native/modules/ios/modules.html
```

## Required Runtime Pieces

```text
DCloudUniappRuntime.xcframework
DCloudUTSFoundation.xcframework
DCloudUTSExtAPI.xcframework
KSCrash.xcframework
DCloudDebugServe.xcframework       # Debug only
DCloudMediaPicker.xcframework      # if uni-media is included
```

`DCloudUTSExtAPI.xcframework` must be manually built with all required iOS API modules. Editing `manifest.json` alone does not package iOS native modules.

## Native Bridge

- `HQUniAppXRouter` builds target URLs and launch parameters.
- `HQUniAppXLaunchStore` exposes launch parameters for `hqwx-data`.
- `HQUniAppXNativeService` exposes native data/action handlers for `hqwx-data`.
- `HQUniAppXBridge` contains the runtime startup handoff and must be bound to the exact DCloud 4.87 start API after SDK headers are available.
