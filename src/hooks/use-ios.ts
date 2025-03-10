import * as React from "react"

/**
 * Hook to detect if the current device is running iOS
 * @returns boolean indicating if the device is running iOS
 */
export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Check if the device is running iOS
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream
    }

    setIsIOS(checkIsIOS())
  }, [])

  return isIOS
} 