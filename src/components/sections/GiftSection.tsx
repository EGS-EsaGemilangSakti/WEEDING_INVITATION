import { useState } from 'react'
import { weddingData as data } from '../../data/weddingData'
import { SectionHeading } from '../SectionHeading'

export function GiftSection() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setStatus('Nomor rekening disalin.') }
    catch { setStatus('Tidak dapat menyalin otomatis.') }
  }
  return (
    <section className="section gift" aria-labelledby="gift-title">
      <SectionHeading eyebrow="Tanda kasih" id="gift-title">Wedding Gift</SectionHeading>
      <p className="intro">Doa dan kehadiran Anda adalah hadiah terindah. Jika ingin mengirim tanda kasih, detail dapat dibuka di bawah.</p>
      <button className="button button--outline" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="gift-details">{open ? 'Tutup Detail' : 'Lihat Detail Gift'}</button>
      <div id="gift-details" hidden={!open}>{data.gifts.map((gift) => <article className="bank" key={gift.bank}><p className="eyebrow">{gift.bank}</p><strong>{gift.account}</strong><p>a.n. {gift.holder}</p><button className="text-button" onClick={() => copy(gift.account)}>Salin nomor</button></article>)}</div>
      <p className="status" role="status" aria-live="polite">{status}</p>
    </section>
  )
}
