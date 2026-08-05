import { useEffect, useRef } from 'react'
import { weddingData as data } from '../../data/weddingData'

export function OpeningCover({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const guest = new URLSearchParams(location.search).get('to')?.trim()

  useEffect(() => {
    document.body.classList.toggle('locked', !open)
    if (!open) buttonRef.current?.focus()
    return () => document.body.classList.remove('locked')
  }, [open])

  return (
    <div className={`opening ${open ? 'opening--gone' : ''}`} role={open ? undefined : 'dialog'}
      aria-modal={open ? undefined : true} aria-labelledby={open ? undefined : 'opening-title'} aria-hidden={open}>
      <img src={data.assets.cover} alt="" width="941" height="1672" fetchPriority="high" />
      <div className="opening__shade" />
      <div className="opening__content">
        <p className="eyebrow">The Wedding of</p>
        <h2 id="opening-title">{data.couple.shortNames}</h2>
        <p className="meta">{data.dateLabel}</p>
        {guest && <p className="guest">Kepada Yth.<strong>{guest}</strong></p>}
        <button ref={buttonRef} className="button button--light" onClick={onOpen}>Buka Undangan <span aria-hidden="true">↓</span></button>
      </div>
    </div>
  )
}
