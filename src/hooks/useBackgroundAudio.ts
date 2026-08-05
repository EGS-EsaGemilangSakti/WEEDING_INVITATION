import { useCallback, useEffect, useRef, useState } from 'react'

const VOLUME = 0.4

export interface BackgroundAudio {
  audioRef: React.RefObject<HTMLAudioElement | null>
  available: boolean
  playing: boolean
  ready: boolean
  errored: boolean
  attemptPlay: () => void
  toggle: () => void
}

export function useBackgroundAudio(src: string): BackgroundAudio {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [errored, setErrored] = useState(false)
  const available = Boolean(src)

  useEffect(() => {
    const el = audioRef.current
    if (!el || !available) return

    el.volume = VOLUME

    const handleLoaded = () => setReady(true)
    const handleError = () => setErrored(true)
    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)

    el.addEventListener('loadedmetadata', handleLoaded)
    el.addEventListener('error', handleError)
    el.addEventListener('play', handlePlay)
    el.addEventListener('pause', handlePause)

    return () => {
      el.removeEventListener('loadedmetadata', handleLoaded)
      el.removeEventListener('error', handleError)
      el.removeEventListener('play', handlePlay)
      el.removeEventListener('pause', handlePause)
      el.pause()
    }
  }, [available])

  const attemptPlay = useCallback(() => {
    const el = audioRef.current
    if (!el || !available || errored) return
    // Blocked-autoplay rejection is expected and handled silently: the
    // invitation stays open and the guest can start music via the control.
    el.play().catch(() => {})
  }, [available, errored])

  const toggle = useCallback(() => {
    const el = audioRef.current
    if (!el || !available || errored) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }, [available, errored])

  return { audioRef, available, playing, ready, errored, attemptPlay, toggle }
}
