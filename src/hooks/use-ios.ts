import * as React from "react"

/**
 * Hook to detect if the current device is running iOS
 * @returns Object with information about iOS and vibration support
 */
export function useIsIOS() {
  const [deviceInfo, setDeviceInfo] = React.useState<{
    isIOS: boolean;
    supportsVibration: boolean;
  }>({
    isIOS: false,
    supportsVibration: false
  })

  React.useEffect(() => {
    // Check if the device is running iOS
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream
    }

    // Check if vibration is supported
    const supportsVibration = "vibrate" in navigator

    setDeviceInfo({
      isIOS: checkIsIOS(),
      supportsVibration
    })
  }, [])

  return deviceInfo
} 