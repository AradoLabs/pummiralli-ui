import { useEffect, useRef } from 'react'

export const MAX_FPS = 60

export default function useAnimationFrame(fps: number, callback: Function) {
  const requestAnimationFrameRef = useRef<number>()
  const frameCountRef = useRef<number>(0)

  const animate = () => {
    frameCountRef.current++
    if (frameCountRef.current >= Math.round(MAX_FPS / fps)) {
      callback()
      frameCountRef.current = 0
    }
    requestAnimationFrameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    frameCountRef.current = 1
    requestAnimationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current)
      }
    }
  }, [])
}
