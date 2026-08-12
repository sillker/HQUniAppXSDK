Pod::Spec.new do |s|
  s.name = 'SDWebImage'
  s.version = '5.7.4'
  s.summary = 'DCloud UniAppX bundled SDWebImage binary.'
  s.homepage = 'https://github.com/SDWebImage/SDWebImage'
  s.license = { :type => 'MIT' }
  s.author = { 'SDWebImage' => 'https://github.com/SDWebImage/SDWebImage' }
  s.source = { :git => 'https://github.com/SDWebImage/SDWebImage.git', :tag => s.version.to_s }
  s.platform = :ios, '12.0'
  s.default_subspec = 'Core'
  s.user_target_xcconfig = {
    'FRAMEWORK_SEARCH_PATHS[sdk=iphoneos*]' => '$(inherited) "${PODS_ROOT}/../HQUniAppXSDK/SDWebImageBinary/SDWebImage.xcframework/ios-arm64"',
    'FRAMEWORK_SEARCH_PATHS[sdk=iphonesimulator*]' => '$(inherited) "${PODS_ROOT}/../HQUniAppXSDK/SDWebImageBinary/SDWebImage.xcframework/ios-arm64_x86_64-simulator"'
  }

  s.subspec 'Core' do |core|
    core.vendored_frameworks = 'SDWebImage.xcframework'
    core.frameworks = [
      'Accelerate',
      'CoreFoundation',
      'CoreGraphics',
      'CoreImage',
      'CoreServices',
      'Foundation',
      'ImageIO',
      'QuartzCore',
      'UIKit'
    ]
  end
end
