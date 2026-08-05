import { weddingData as data } from '../../data/weddingData'

export function QuoteSection() {
  return (
    <section className="section quote" aria-labelledby="quote-title">
      <div data-reveal>
        <span className="quote__mark" aria-hidden="true">❦</span>
        <h2 id="quote-title" className="sr-only">Kutipan pernikahan</h2>
        <p className="quote__arabic" dir="rtl" lang="ar">{data.quote.arabic}</p>
        <p className="quote__translation">“{data.quote.translation}”</p>
        <p className="meta">{data.quote.source}</p>
      </div>
    </section>
  )
}
