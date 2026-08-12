# DCloudUTSExtAPI.xcframework Build Notes

`manifest.json` does not package iOS API modules into a native app. For iOS native integration, create and build `DCloudUTSExtAPI.xcframework` manually with DCloud SDK 4.87.

Reference:

```text
https://doc.dcloud.net.cn/uni-app-x/native/modules/ios/modules.html
```

## Required Modules For This App

Base/runtime modules:

```text
app-common-release
app-runtime-release
framework-release
dcloud-layout-release
uts-runtime-release
```

API modules:

```text
uni-exit
uni-getAccessibilityInfo
uni-getAppAuthorizeSetting
uni-getAppBaseInfo
uni-getDeviceInfo
uni-getSystemInfo
uni-getSystemSetting
uni-openAppAuthorizeSetting
uni-prompt
uni-rpx2px
uni-storage
uni-theme
uni-network
uni-previewImage
uni-modal
uni-media
uni-rich-text
nativeobj-preview
```

High-risk APIs that must be tested on device:

```text
uni-modal
uni-rich-text
uni-theme
uni-getDeviceInfo
uni-getAppBaseInfo
uni-getSystemSetting
uni-exit
uni-media
uni-previewImage
```

## Build Output

Place the generated framework here:

```text
HQUniAppXSDK/Frameworks/DCloudUTSExtAPI.xcframework
```

Also place required DCloud runtime frameworks in the same directory.

## Local Build Command

The current repository includes a repeatable build script:

```sh
UNIAPPX_IOS_ZIP=/tmp/UniAppX-iOS-4.87.zip ruby HQUniAppXSDK/Scripts/build_dcloud_uts_ext_api.rb
```

The script builds the required base modules and this app's optional modules:

```text
uni-network
uni-media
uni-previewImage
uni-rich-text
```

`uni-rich-text` is registered in `uts-config.json` as a `customElement`, which is required for DCloud 4.71 to 5.0.

The simulator slice is `x86_64` only because DCloud 4.87 `storage.framework` does not contain a valid `arm64-simulator` slice. For simulator debugging, use Rosetta/x86_64 or keep `EXCLUDED_ARCHS[sdk=iphonesimulator*]=arm64`.

`uni-getAccessibilityInfo` is listed in Android's AAR set, but DCloud 4.87 iOS `SDK/ExtApiSrc` does not provide a matching source file and the official iOS modules document does not list it.
