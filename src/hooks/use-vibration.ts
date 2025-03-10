import * as React from "react"
import { useIsIOS } from "./use-ios"

/**
 * Hook to handle device vibration
 * @returns A function to trigger vibration
 */
export function useVibration() {
  const isIOS = useIsIOS()

  const vibrate = React.useCallback((duration: number = 15) => {
    // Check if vibration API is supported
    if ("vibrate" in navigator) {
      navigator.vibrate(duration)
    } else {
      // Pour iOS, nous ne pouvons pas déclencher de vibration dans une application web
      // Safari iOS ne prend pas en charge l'API Vibration
      console.log("La vibration n'est pas prise en charge sur ce navigateur")
    }
  }, [])

  return vibrate
} 