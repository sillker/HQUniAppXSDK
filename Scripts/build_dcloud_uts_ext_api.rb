#!/usr/bin/env ruby
# frozen_string_literal: true

require 'fileutils'
require 'json'
require 'xcodeproj'

ROOT = File.expand_path('..', __dir__)
SDK_ZIP = ENV.fetch('UNIAPPX_IOS_ZIP', '/tmp/UniAppX-iOS-4.87.zip')
SDK_ROOT_NAME = 'UniAppX-iOS@4.87'
WORK_DIR = ENV.fetch('UNIAPPX_BUILD_DIR', '/tmp/hq_dcloud_uts_ext_build')
DERIVED_SIM = ENV.fetch('UNIAPPX_DERIVED_SIM', '/tmp/hq_dcloud_uts_ext_dd_sim')
DERIVED_OS = ENV.fetch('UNIAPPX_DERIVED_OS', '/tmp/hq_dcloud_uts_ext_dd_os')

SOURCE_FILES = %w[
  UTSOC.h UTSOC.mm
  uni-getAppAuthorizeSetting-index.swift
  uni-getAppBaseInfo-index.swift
  uni-getDeviceInfo-index.swift
  uni-getSystemInfo-index.swift
  uni-getSystemSetting-index.swift
  uni-openAppAuthorizeSetting-index.swift
  uni-prompt-index.swift
  uni-rpx2px-index.swift
  uni-storage-index.swift
  uni-theme-index.swift
  uni-getElementById-DCUniGetElementById.swift
  uni-getElementById-index.swift
  uni-crash-index.swift
  uni-crash-UniCrashManager.swift
  uni-privacy-index.swift
  uni-dialogPage-index.swift
  uni-dialogPage-native.swift
  uni-event-index.swift
  uni-event-native.swift
  uni-exit-index.swift
  uni-actionSheet-index.swift
  uni-modal-index.swift
  uni-prompt-UniAlert-DCActionSheetActionCell.swift
  uni-prompt-UniAlert-DCActionSheetController.swift
  uni-prompt-UniAlert-DCActionSheetHeader.swift
  uni-prompt-UniAlert-DCAlertContentView.swift
  uni-prompt-UniAlert-DCAlertControllerUtil.swift
  uni-prompt-UniAlert-DCAlertView.Blocks.swift
  uni-prompt-UniAlert-DCAlertViewController.swift
  uni-prompt-UniAlert-DCBottomMenuController.swift
  uni-prompt-UniAlert-DCloudAlertControllerComponents.swift
  uni-prompt-UniAlert-DCloudTextView.swift
  uni-prompt-UniAlert-DCRIButtonItem.swift
  uni-prompt-UniAlert-UIView.Layout.swift
  uni-prompt-UniToast-MCToast.swift
  uni-prompt-UniToast-MCToast+Loading.swift
  uni-prompt-UniToast-MCToast+Remove.swift
  uni-prompt-UniToast-MCToast+Status.swift
  uni-prompt-UniToast-MCToast+StatusBar.swift
  uni-prompt-UniToast-MCToast+Text.swift
  uni-prompt-UniToast-MCToastConfig.swift
  uni-prompt-UniToast-MCToastHelper.swift
  uni-form-index.swift
  uni-network-index.swift
  uni-media-index.swift
  uni-media-utils-UniChooseFileManager.swift
  uni-previewImage-index.swift
  uni-rich-text-index.swift
].freeze

EXTRA_SOURCE_FILES = %w[].freeze

LINKED_LIBS = %w[
  DCloudUniappRuntime.xcframework
  DCloudUTSFoundation.xcframework
  DCUniToast.xcframework
  DCloudAlertController.xcframework
  KSCrash.xcframework
  DCloudMediaPicker.xcframework
  storage.framework
].freeze

def run(command)
  puts command
  system(command) || abort("command failed: #{command}")
end

abort("missing SDK zip: #{SDK_ZIP}") unless File.exist?(SDK_ZIP)

FileUtils.rm_rf(WORK_DIR)
FileUtils.mkdir_p(File.join(WORK_DIR, 'DCloudUTSExtAPI'))

entries = SOURCE_FILES.map { |name| "#{SDK_ROOT_NAME}/SDK/ExtApiSrc/#{name}" }
run(%(unzip -q -o "#{SDK_ZIP}" #{entries.map { |entry| %("#{entry}") }.join(' ')} -d "#{WORK_DIR}/sdk"))

sdk_src_dir = File.join(WORK_DIR, 'sdk', SDK_ROOT_NAME, 'SDK', 'ExtApiSrc')
target_src_dir = File.join(WORK_DIR, 'DCloudUTSExtAPI')
SOURCE_FILES.each do |name|
  source = File.join(sdk_src_dir, name)
  abort("missing source: #{source}") unless File.exist?(source)

  FileUtils.cp(source, File.join(target_src_dir, name))
end

EXTRA_SOURCE_FILES.each do |name|
  source = File.join(ROOT, 'Sources', name)
  abort("missing source: #{source}") unless File.exist?(source)

  FileUtils.cp(source, File.join(target_src_dir, name))
end

File.write(File.join(target_src_dir, 'uts-config.json'), JSON.pretty_generate({
  'components' => [{
    'type' => 'customElement',
    'name' => 'rich-text',
    'class' => 'UTSSDKModulesDCloudUniRichTextUniRichTextElement',
    'delegateClass' => 'UniRichTextElementRegister'
  }]
}))
File.write(File.join(target_src_dir, 'DCloudUTSExtAPI.h'), "#import <Foundation/Foundation.h>\n#import \"UTSOC.h\"\n")

project_path = File.join(WORK_DIR, 'DCloudUTSExtAPI.xcodeproj')
project = Xcodeproj::Project.new(project_path)
target = project.new_target(:framework, 'DCloudUTSExtAPI', :ios, '12.0')
target.product_reference.path = 'DCloudUTSExtAPI.framework'

target.build_configurations.each do |configuration|
  settings = configuration.build_settings
  settings['PRODUCT_NAME'] = '$(TARGET_NAME)'
  settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'com.hqwx.uniappx.DCloudUTSExtAPI'
  settings['GENERATE_INFOPLIST_FILE'] = 'YES'
  settings['MARKETING_VERSION'] = '1.0'
  settings['CURRENT_PROJECT_VERSION'] = '1'
  settings['SWIFT_VERSION'] = '5.0'
  settings['DEFINES_MODULE'] = 'YES'
  settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
  settings['MACH_O_TYPE'] = 'mh_dylib'
  settings['SKIP_INSTALL'] = 'NO'
  settings['OTHER_LDFLAGS'] = '$(inherited) -ObjC'
  settings['ENABLE_MODULE_VERIFIER'] = 'NO'
  settings['CLANG_ENABLE_MODULES'] = 'YES'
  settings['CLANG_ENABLE_OBJC_ARC'] = 'YES'
  settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'gnu++20'
  settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
  settings['FRAMEWORK_SEARCH_PATHS'] = ['$(inherited)', File.join(ROOT, 'Frameworks')]
  settings['LIBRARY_SEARCH_PATHS'] = ['$(inherited)', File.join(ROOT, 'Frameworks')]
  settings['LD_RUNPATH_SEARCH_PATHS'] = ['$(inherited)', '@executable_path/Frameworks', '@loader_path/Frameworks']
end

frameworks_group = project.main_group.new_group('Frameworks')
LINKED_LIBS.each do |name|
  ref = frameworks_group.new_file(File.join(ROOT, 'Frameworks', name))
  target.frameworks_build_phase.add_file_reference(ref)
end

source_group = project.main_group.new_group('DCloudUTSExtAPI', 'DCloudUTSExtAPI')
(SOURCE_FILES + EXTRA_SOURCE_FILES).each do |name|
  ref = source_group.new_file(name)
  if name.end_with?('.h')
    target.headers_build_phase.add_file_reference(ref, true)
  else
    target.add_file_references([ref])
  end
end
target.headers_build_phase.add_file_reference(source_group.new_file('DCloudUTSExtAPI.h'), true)
target.resources_build_phase.add_file_reference(source_group.new_file('uts-config.json'))
project.save

FileUtils.rm_rf([DERIVED_SIM, DERIVED_OS])
sim_log = File.join(WORK_DIR, 'build-simulator.log')
os_log = File.join(WORK_DIR, 'build-iphoneos.log')

run(%(xcodebuild -quiet -project "#{project_path}" -scheme DCloudUTSExtAPI -configuration Release -sdk iphonesimulator -derivedDataPath "#{DERIVED_SIM}" BUILD_LIBRARY_FOR_DISTRIBUTION=YES SKIP_INSTALL=NO ARCHS=x86_64 ONLY_ACTIVE_ARCH=NO 'EXCLUDED_ARCHS[sdk=iphonesimulator*]=arm64' build > "#{sim_log}" 2>&1))
run(%(xcodebuild -quiet -project "#{project_path}" -scheme DCloudUTSExtAPI -configuration Release -sdk iphoneos -derivedDataPath "#{DERIVED_OS}" BUILD_LIBRARY_FOR_DISTRIBUTION=YES SKIP_INSTALL=NO build > "#{os_log}" 2>&1))

output = File.join(ROOT, 'Frameworks', 'DCloudUTSExtAPI.xcframework')
FileUtils.rm_rf(output)
run(%(xcodebuild -create-xcframework -framework "#{DERIVED_OS}/Build/Products/Release-iphoneos/DCloudUTSExtAPI.framework" -framework "#{DERIVED_SIM}/Build/Products/Release-iphonesimulator/DCloudUTSExtAPI.framework" -output "#{output}"))

puts "created: #{output}"
