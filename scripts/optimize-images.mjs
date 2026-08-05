import sharp from 'sharp'
import { statSync } from 'node:fs'
import path from 'node:path'

const dir = path.resolve('public/Jawa_Modern_Parallax_Asset_Pack')

const fmt = (n) => (n / 1024 / 1024).toFixed(2) + ' MB'

function report(label, before, after) {
  const pct = (100 * (1 - after / before)).toFixed(1)
  console.log(`${label}: ${fmt(before)} -> ${fmt(after)}  (-${pct}%)`)
}

async function toWebp(file, quality, alphaQuality = quality) {
  const p = path.join(dir, file)
  const out = p.replace(/\.png$/, '.webp')
  const before = statSync(p).size
  await sharp(p).webp({ quality, alphaQuality, effort: 6 }).toFile(out)
  report(`${file} -> webp`, before, statSync(out).size)
}

// Source PNGs are never modified -- they stay on disk as pristine masters
// for future re-exports. Only new .webp derivatives are written.

// Non-hero images (opening cover, gallery): free to optimize.
await toWebp('08-opening-cover.png', 84)
await toWebp('09-gallery-walk.png', 82)
await toWebp('10-gallery-editorial.png', 82)
await toWebp('11-gallery-closeup.png', 82)

// Hero parallax layers. Quality kept high (90) because the camera + layer
// scale transforms in ParallaxHero.tsx can magnify these up to ~2.8x on
// screen, where compression artifacts would be most visible.
for (const file of [
  '01-far-background.png',
  '02-rear-architecture.png',
  '03-middle-arch.png',
  '04-front-arch.png',
  '05-fictional-couple.png',
  '06-foreground-left.png',
  '07-foreground-right.png',
]) {
  await toWebp(file, 90)
}

console.log('Done.')
