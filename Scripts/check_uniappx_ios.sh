#!/bin/sh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$ROOT_DIR/Resources/uni-app-x/apps/__UNI__DF02813/www"
FRAMEWORK_DIR="$ROOT_DIR/Frameworks"

missing=0

check_path() {
  if [ ! -e "$1" ]; then
    echo "missing: $1"
    missing=1
  else
    echo "ok: $1"
  fi
}

check_path "$APP_DIR"
check_path "$APP_DIR/manifest.json"
check_path "$APP_DIR/app-config.js"
check_path "$FRAMEWORK_DIR/DCloudUniappRuntime.xcframework"
check_path "$FRAMEWORK_DIR/DCloudUTSFoundation.xcframework"
check_path "$FRAMEWORK_DIR/DCloudUTSExtAPI.xcframework"
check_path "$FRAMEWORK_DIR/KSCrash.xcframework"
check_path "$FRAMEWORK_DIR/DCUniToast.xcframework"
check_path "$FRAMEWORK_DIR/DCloudAlertController.xcframework"
check_path "$FRAMEWORK_DIR/DCloudMediaPicker.xcframework"
check_path "$FRAMEWORK_DIR/storage.framework"
check_path "$ROOT_DIR/Resources/DCloud/uni-prompt.bundle"
check_path "$ROOT_DIR/Resources/DCloud/DCTZImagePickerController.bundle"
check_path "$ROOT_DIR/Resources/DCloud/uts-config.json"

if [ -f "$APP_DIR/manifest.json" ]; then
  echo "manifest compilerVersion:"
  /usr/bin/grep -n '"compilerVersion"' "$APP_DIR/manifest.json" || true
fi

if [ "$missing" -ne 0 ]; then
  echo "UniAppX iOS integration is incomplete."
  exit 1
fi

echo "UniAppX iOS integration files exist."
