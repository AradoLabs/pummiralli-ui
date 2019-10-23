import { useEffect, useRef } from 'react'

/**
 * Wraps `setInterval`. Triggers the function each interval.
 * @param {Function} callback function to call
 * @param {number} delay in milliseconds
 * @return {void}
 */
export default function useInterval(
  callback: Function,
  delay: number | null,
): void {
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
