import { useState } from 'react'
import { weddingData as data } from '../../data/weddingData'
import { SectionHeading } from '../SectionHeading'

export function RsvpSection() {
  const [message, setMessage] = useState('')
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    if (!name) { setMessage('Mohon isi nama terlebih dahulu.'); return }
    if (data.rsvpWhatsapp) {
      const text = encodeURIComponent(`RSVP ${name}: ${form.get('attendance')}, ${form.get('guests')} tamu. ${form.get('note')}`)
      window.open(`https://wa.me/${data.rsvpWhatsapp}?text=${text}`, '_blank', 'noopener,noreferrer')
      setMessage('Draf RSVP dibuka di WhatsApp. Silakan kirim untuk mengonfirmasi.')
    } else setMessage('Draf sudah lengkap, tetapi kontak RSVP belum dikonfigurasi. Data belum dikirim atau disimpan.')
  }
  return (
    <section className="section rsvp" aria-labelledby="rsvp-title">
      <SectionHeading eyebrow="Konfirmasi kehadiran" id="rsvp-title">RSVP</SectionHeading>
      <form onSubmit={submit} noValidate data-reveal>
        <label>Nama lengkap<input name="name" autoComplete="name" required /></label>
        <div className="form-row"><label>Jumlah tamu<select name="guests"><option>1</option><option>2</option><option>3</option><option>4</option></select></label><label>Kehadiran<select name="attendance"><option>Hadir</option><option>Tidak hadir</option></select></label></div>
        <label>Catatan (opsional)<textarea name="note" rows={3} /></label>
        <button className="button" type="submit">Siapkan Konfirmasi</button>
        <p className="form-note">Form ini tidak menyimpan data ke server.</p><p className="status" role="status" aria-live="polite">{message}</p>
      </form>
    </section>
  )
}
