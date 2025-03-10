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
    } else if (isIOS) {
      // For iOS devices, we can try to use the AudioContext API as a fallback
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        // Set up a silent oscillator
        oscillator.frequency.value = 0
        gainNode.gain.value = 0
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // Start and stop the oscillator to trigger a "click" on iOS
        oscillator.start()
        oscillator.stop(audioContext.currentTime + duration / 1000)
      } catch (error) {
        console.error("Vibration fallback failed:", error)
      }
    }
  }, [isIOS])

  return vibrate
} 