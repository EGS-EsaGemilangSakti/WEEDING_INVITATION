import { useEffect, useState } from 'react'

export function useCountdown(target: string) {
  const [remaining, setRemaining] = useState(() => Math.max(0, new Date(target).getTime() - Date.now()))
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, new Date(target).getTime() - Date.now())), 1000)
    return () => window.clearInterval(timer)
  }, [target])
  const seconds = Math.floor(remaining / 1000)
  return { days: Math.floor(seconds / 86400), hours: Math.floor((seconds % 86400) / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60, ended: remaining === 0 }
}
