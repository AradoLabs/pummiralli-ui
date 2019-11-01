import { useEffect, useRef, useCallback } from 'react'

export const MAX_FPS = 60

export default function useAnimationFrame(fps: number, callback: Function) {
  const requestAnimationFrameRef = useRef<number>()
  const frameCountRef = useRef<number>(0)

  const memoizedAnimate = useCallback(() => {
    frameCountRef.current++
    if (frameCountRef.current >= Math.round(MAX_FPS / fps)) {
      callback()
      frameCountRef.current = 0
    }
    requestAnimationFrameRef.current = requestAnimationFrame(memoizedAnimate)
  }, [fps, callback])

  useEffect(() => {
    frameCountRef.current = 1
    requestAnimationFrameRef.current = requestAnimationFrame(memoizedAnimate)
    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current)
      }
    }
  }, [memoizedAnimate])
}
