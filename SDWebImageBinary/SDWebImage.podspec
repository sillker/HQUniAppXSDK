Pod::Spec.new do |s|
  s.name = 'SDWebImage'
  s.version = '5.7.4'
  s.summary = 'DCloud UniAppX bundled SDWebImage binary.'
  s.homepage = 'https://github.com/SDWebImage/SDWebImage'
  s.license = { :type => 'MIT' }
  s.author = { 'SDWebImage' => 'https://github.com/SDWebImage/SDWebImage' }
  s.source = { :git => 'https://github.com/sillker/HQUniAppXSDK.git', :tag => '1.0.0' }
  s.platform = :ios, '13.0'
  s.default_subspec = 'Core'

  s.subspec 'Core' do |core|
    core.vendored_frameworks = 'SDWebImageBinary/SDWebImage.xcframework'
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
