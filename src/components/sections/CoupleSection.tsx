import { weddingData as data } from '../../data/weddingData'
import { SectionHeading } from '../SectionHeading'

export function CoupleSection() {
  return (
    <section className="section couple" aria-labelledby="couple-title">
      <SectionHeading eyebrow="Assalamu’alaikum" id="couple-title">Mempelai</SectionHeading>
      <p className="intro" data-reveal>Dengan memohon rahmat dan rida Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam hari bahagia kami.</p>
      <div className="couple__profiles">
        <article data-reveal><p className="script">{data.couple.bride.name}</p><h3>{data.couple.bride.fullName}</h3><p>{data.couple.bride.parents}</p></article>
        <span className="couple__amp" aria-hidden="true">&</span>
        <article data-reveal><p className="script">{data.couple.groom.name}</p><h3>{data.couple.groom.fullName}</h3><p>{data.couple.groom.parents}</p></article>
      </div>
    </section>
  )
}
