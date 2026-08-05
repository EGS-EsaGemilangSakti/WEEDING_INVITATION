import { weddingData as data } from '../../data/weddingData'
import { SectionHeading } from '../SectionHeading'

export function StorySection() {
  return (
    <section className="section story" aria-labelledby="story-title">
      <SectionHeading eyebrow="Jejak langkah" id="story-title">Our Story</SectionHeading>
      <div className="timeline">
        {data.story.map((item) => <article key={item.year} data-reveal><time>{item.year}</time><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
      </div>
    </section>
  )
}
