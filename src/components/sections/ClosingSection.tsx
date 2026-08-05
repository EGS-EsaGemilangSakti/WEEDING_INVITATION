import { weddingData as data } from '../../data/weddingData'

export function ClosingSection() {
  return (
    <footer className="closing">
      <div data-reveal>
        <p className="eyebrow">Terima kasih</p>
        <h2>{data.couple.shortNames}</h2>
        <p>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir serta memberikan doa restu.</p>
        <span aria-hidden="true">ꦧꦼꦕꦶꦏ꧀</span>
      </div>
    </footer>
  )
}
