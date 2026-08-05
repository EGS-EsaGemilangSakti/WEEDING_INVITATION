import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const motionQuery = matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | null = null
    const configure = () => {
      observer?.disconnect()
      if (motionQuery.matches) {
        nodes.forEach((node) => { node.dataset.visible = 'true' })
        return
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          ;(entry.target as HTMLElement).dataset.visible = 'true'
          observer?.unobserve(entry.target)
        })
      }, { threshold: 0.15 })
      nodes.filter((node) => node.dataset.visible !== 'true').forEach((node) => observer?.observe(node))
    }
    configure()
    motionQuery.addEventListener('change', configure)
    return () => { observer?.disconnect(); motionQuery.removeEventListener('change', configure) }
  }, [])
}
