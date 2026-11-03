Pod::Spec.new do |s|
  s.name = 'HQUniAppXSDK'
  s.version = '1.0.6'
  s.summary = 'HQ Pad HD UniAppX native bridge.'
  s.homepage = 'https://www.hqwx.com'
  s.license = {
    :type => 'Proprietary',
    :text => 'Copyright edu24ol.'
  }
  s.author = {
    'HQWX' => 'ios@hqwx.com'
  }
  s.source = {
    :git => 'https://github.com/sillker/HQUniAppXSDK.git',
    :tag => s.version.to_s
  }
  s.platform = :ios, '15.0'

  s.source_files = 'Sources/**/*.{h,m,mm,swift}'
  s.resources = [
    'Resources/uni-app-x',
    'Resources/DCloud/**/*'
  ]

  vendored_frameworks = (
    Dir['Frameworks/*.xcframework'] +
    Dir['Frameworks/*.framework']
  ).reject do |framework|
    File.basename(framework) == 'SDWebImage.xcframework'
  end

  s.vendored_frameworks = vendored_frameworks unless vendored_frameworks.empty?

  s.frameworks = [
    'JavaScriptCore',
    'Photos',
    'PhotosUI',
    'AVFoundation',
    'AssetsLibrary',
    'CoreFoundation',
    'CoreGraphics',
    'CoreImage',
    'CoreServices',
    'CoreText',
    'GLKit',
    'ImageIO',
    'MediaPlayer',
    'MetalKit',
    'MobileCoreServices',
    'QuartzCore',
    'SystemConfiguration',
    'UniformTypeIdentifiers'
  ]

  s.libraries = ['c++', 'z', 'sqlite3']

  s.pod_target_xcconfig = {
    'OTHER_LDFLAGS' => '$(inherited) -ObjC -weak_framework SwiftUI',
    'BUILD_LIBRARY_FOR_DISTRIBUTION' => 'NO',
    'GCC_PREPROCESSOR_DEFINITIONS' => '$(inherited) HQ_PAD_HD=1'
  }
end
