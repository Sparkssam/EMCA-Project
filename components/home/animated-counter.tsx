"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  target: number
  suffix?: string
  duration?: number
}

export function AnimatedCounter({ target, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target, duration])

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  )
}
