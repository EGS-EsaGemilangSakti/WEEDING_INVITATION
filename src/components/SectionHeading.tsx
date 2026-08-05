export function SectionHeading({ eyebrow, children, id }: { eyebrow: string; children: React.ReactNode; id: string }) {
  return (
    <header className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{children}</h2>
      <span aria-hidden="true" className="ornament">◆</span>
    </header>
  )
}
