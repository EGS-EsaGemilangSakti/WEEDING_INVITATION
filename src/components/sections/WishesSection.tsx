import { useState } from 'react'
import { weddingData as data } from '../../data/weddingData'
import { SectionHeading } from '../SectionHeading'
type Wish = { name: string; message: string }

export function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([...data.sampleWishes])
  const [status, setStatus] = useState('')
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    if (!name || !message) { setStatus('Nama dan ucapan wajib diisi.'); return }
    setWishes((current) => [{ name, message }, ...current]); event.currentTarget.reset()
    setStatus('Ucapan ditambahkan untuk sesi ini; belum tersimpan ke server.')
  }
  return (
    <section className="section wishes" aria-labelledby="wishes-title">
      <SectionHeading eyebrow="Doa terbaik" id="wishes-title">Ucapan & Doa</SectionHeading>
      <form onSubmit={submit} data-reveal><label>Nama<input name="name" required /></label><label>Ucapan<textarea name="message" rows={4} required /></label><button className="button" type="submit">Tambahkan Ucapan</button><p className="status" role="status" aria-live="polite">{status}</p></form>
      <div className="wish-list">{wishes.map((wish, index) => <blockquote key={`${wish.name}-${index}`}><p>“{wish.message}”</p><cite>— {wish.name}</cite></blockquote>)}</div>
    </section>
  )
}
