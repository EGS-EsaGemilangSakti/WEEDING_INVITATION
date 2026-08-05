import { useEffect, useRef } from 'react'
import { weddingData as data } from '../../data/weddingData'

type LayerMotion = {
  file: string
  scrollX: number
  scrollY: number
  pointerX: number
  pointerY: number
  scaleFrom: number
  scaleTo: number
}

const motionProfiles: LayerMotion[] = [
  { file: '01-far-background.png', scrollX: 0, scrollY: -42, pointerX: 3, pointerY: 2, scaleFrom: 1.07, scaleTo: 1.12 },
  { file: '02-rear-architecture.png', scrollX: 0, scrollY: -105, pointerX: 6, pointerY: 4, scaleFrom: 1.045, scaleTo: 1.16 },
  { file: '03-middle-arch.png', scrollX: 0, scrollY: -175, pointerX: 9, pointerY: 6, scaleFrom: 1.03, scaleTo: 1.2 },
  { file: '04-front-arch.png', scrollX: 0, scrollY: -245, pointerX: 12, pointerY: 8, scaleFrom: 1.02, scaleTo: 1.25 },
  { file: '05-fictional-couple.png', scrollX: 0, scrollY: -128, pointerX: 7, pointerY: 5, scaleFrom: 1.015, scaleTo: 1.1 },
  { file: '06-foreground-left.png', scrollX: -430, scrollY: -155, pointerX: 22, pointerY: 14, scaleFrom: 1.08, scaleTo: 1.18 },
  { file: '07-foreground-right.png', scrollX: 430, scrollY: -155, pointerX: -22, pointerY: 14, scaleFrom: 1.08, scaleTo: 1.18 },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress
const smoothstep = (value: number) => { const x = clamp(value); return x * x * (3 - 2 * x) }
const easeOutCubic = (value: number) => 1 - Math.pow(1 - clamp(value), 3)

export function ParallaxHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const sticky = stickyRef.current
    if (!track || !sticky) return
    const layers = [...sticky.querySelectorAll<HTMLElement>('.parallax__layer')]
    const camera = sticky.querySelector<HTMLElement>('.parallax__camera')
    const title = sticky.querySelector<HTMLElement>('.parallax__title')
    const atmosphere = sticky.querySelector<HTMLElement>('.parallax__atmosphere')
    const transition = sticky.querySelector<HTMLElement>('.parallax__fade')
    const scrollCue = sticky.querySelector<HTMLElement>('.parallax__scroll-cue')
    const portalContent = sticky.querySelector<HTMLElement>('.parallax__portal-content')
    const motionQuery = matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = matchMedia('(pointer: fine)')
    let reduced = motionQuery.matches
    let active = false
    let frame = 0
    let targetX = 0
    let targetY = 0
    let pointerX = 0
    let pointerY = 0

    const render = () => {
      frame = 0
      if (!active) return
      const rect = track.getBoundingClientRect()
      const journey = Math.max(1, rect.height - innerHeight)
      const rawProgress = clamp(-rect.top / journey)
      const revealProgress = smoothstep(clamp(rawProgress / 0.34))
      const zoomProgress = smoothstep(clamp((rawProgress - 0.28) / 0.5))
      const exitProgress = smoothstep(clamp((rawProgress - 0.7) / 0.3))
      const mobileMultiplier = innerWidth < 700 ? 0.78 : 1
      const pointerEnabled = pointerQuery.matches && innerWidth >= 700 && !reduced

      pointerX += ((pointerEnabled ? targetX : 0) - pointerX) * 0.09
      pointerY += ((pointerEnabled ? targetY : 0) - pointerY) * 0.09
      motionProfiles.forEach((profile, index) => {
        const movement = reduced ? 0 : mobileMultiplier
        const layerProgress = index >= 5 ? revealProgress : zoomProgress
        const x = profile.scrollX * layerProgress * movement + profile.pointerX * pointerX
        const y = profile.scrollY * layerProgress * movement + profile.pointerY * pointerY
        const mobileScaleTo = lerp(profile.scaleFrom, profile.scaleTo, mobileMultiplier)
        const scale = reduced ? profile.scaleFrom : lerp(profile.scaleFrom, mobileScaleTo, easeOutCubic(layerProgress))
        layers[index].style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
        if (index >= 5) layers[index].style.opacity = String(reduced ? 1 : 1 - smoothstep((revealProgress - 0.68) / 0.32))
        else if (index === 4) layers[index].style.opacity = String(reduced ? 1 : 1 - smoothstep((zoomProgress - 0.42) / 0.58) * 0.92)
      })
      if (camera) {
        const cameraScale = reduced ? 1 : lerp(1, innerWidth < 700 ? 1.9 : 2.25, easeOutCubic(zoomProgress))
        const cameraY = reduced ? 0 : lerp(0, innerWidth < 700 ? -82 : -128, zoomProgress)
        camera.style.transform = `translate3d(0, ${cameraY}px, 0) scale(${cameraScale})`
      }
      if (title) {
        const entrance = smoothstep(rawProgress / 0.18)
        title.style.opacity = String(reduced ? 1 : clamp(lerp(0.78, 1, entrance) * (1 - exitProgress * 1.15)))
        title.style.transform = `translate3d(0, ${reduced ? 0 : lerp(18, -48, easeOutCubic(rawProgress))}px, 0)`
      }
      if (atmosphere) atmosphere.style.opacity = String(reduced ? 0.36 : lerp(0.18, 0.72, exitProgress))
      if (transition) {
        transition.style.opacity = String(reduced ? 1 : lerp(0.42, 1, exitProgress))
        transition.style.transform = `translate3d(0, ${reduced ? 0 : lerp(24, 0, exitProgress)}%, 0)`
      }
      if (scrollCue) scrollCue.style.opacity = String(reduced ? 0 : 1 - smoothstep(rawProgress / 0.14))
      if (portalContent) {
        portalContent.style.opacity = String(reduced ? 0 : exitProgress)
        portalContent.style.transform = `translate3d(0, ${lerp(34, 0, exitProgress)}px, 0)`
      }
      const pointerMoving = Math.abs(targetX - pointerX) > 0.002 || Math.abs(targetY - pointerY) > 0.002
      if (pointerMoving) frame = requestAnimationFrame(render)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render) }
    const handlePointer = (event: PointerEvent) => {
      if (!pointerQuery.matches || innerWidth < 700 || reduced) return
      const rect = sticky.getBoundingClientRect()
      targetX = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
      targetY = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
      schedule()
    }
    const resetPointer = () => { targetX = 0; targetY = 0; schedule() }
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches
      track.classList.toggle('is-reduced', reduced)
      layers.forEach((layer) => layer.classList.toggle('is-active', active && !reduced))
      resetPointer()
    }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      layers.forEach((layer) => layer.classList.toggle('is-active', active && !reduced))
      schedule()
    }, { threshold: 0.01 })

    track.classList.toggle('is-reduced', reduced)
    observer.observe(track)
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule, { passive: true })
    sticky.addEventListener('pointermove', handlePointer, { passive: true })
    sticky.addEventListener('pointerleave', resetPointer, { passive: true })
    motionQuery.addEventListener('change', handleMotionChange)
    return () => {
      observer.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule)
      sticky.removeEventListener('pointermove', handlePointer); sticky.removeEventListener('pointerleave', resetPointer)
      motionQuery.removeEventListener('change', handleMotionChange); cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="parallax-track" ref={trackRef} aria-labelledby="hero-title">
      <div className="parallax-sticky" ref={stickyRef}>
        <div className="parallax__scene-frame">
          <div className="parallax__camera">
            <div className="parallax__stack">
              {motionProfiles.map((profile, index) => (
                <img className={`parallax__layer layer-${index + 1}`} key={profile.file}
                  src={`${data.assets.heroBase}/${profile.file}`} alt="" width="941" height="1672"
                  decoding={index < 2 ? 'sync' : 'async'} fetchPriority={index === 0 ? 'high' : 'auto'} />
              ))}
            </div>
            <div className="parallax__atmosphere" aria-hidden="true" />
          </div>
          <div className="parallax__title">
            <p className="eyebrow">We are getting married</p>
            <h1 id="hero-title" tabIndex={-1}>{data.couple.shortNames}</h1>
            <p className="meta">{data.dateLabel}</p>
          </div>
          <div className="parallax__scroll-cue" aria-hidden="true">
            <span>Scroll untuk menjelajah</span>
            <i />
          </div>
          <div className="parallax__fade" aria-hidden="true" />
          <div className="parallax__portal-content" aria-hidden="true">
            <span>❦</span>
            <p>Memasuki kisah kami</p>
          </div>
        </div>
      </div>
    </section>
  )
}
