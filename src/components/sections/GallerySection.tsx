import { useEffect, useRef, useState } from 'react'
import { weddingData as data } from '../../data/weddingData'
import { SectionHeading } from '../SectionHeading'

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const isOpen = selected !== null

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLButtonElement>('.lightbox__close')?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowRight') setSelected((current) => current === null ? null : (current + 1) % data.gallery.length)
      if (event.key === 'ArrowLeft') setSelected((current) => current === null ? null : (current - 1 + data.gallery.length) % data.gallery.length)
      if (event.key === 'Tab' && dialog) {
        const controls = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled])')]
        const first = controls[0]
        const last = controls.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => { if (!isOpen) triggerRef.current?.focus() }, [isOpen])

  return (
    <section className="section gallery" aria-labelledby="gallery-title">
      <SectionHeading eyebrow="Captured moments" id="gallery-title">Galeri</SectionHeading>
      <div className="gallery__grid">
        {data.gallery.map((image, index) => (
          <button key={image.src} onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(index) }}
            aria-label={`Buka foto ${index + 1} dari ${data.gallery.length}`} data-reveal>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={image.width} height={image.height} />
          </button>
        ))}
      </div>
      {selected !== null && (
        <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }}>
          <h2 id="lightbox-title" className="sr-only">Pratinjau galeri</h2>
          <button className="lightbox__close" onClick={() => setSelected(null)} aria-label="Tutup galeri">×</button>
          <button onClick={() => setSelected((selected - 1 + data.gallery.length) % data.gallery.length)} aria-label="Foto sebelumnya">‹</button>
          <img src={data.gallery[selected].src} alt={data.gallery[selected].alt} width={data.gallery[selected].width} height={data.gallery[selected].height} />
          <button onClick={() => setSelected((selected + 1) % data.gallery.length)} aria-label="Foto berikutnya">›</button>
        </div>
      )}
    </section>
  )
}
