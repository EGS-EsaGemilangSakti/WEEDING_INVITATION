import { useEffect, useState } from 'react'
import './App.css'
import './refinements.css'
import { AudioControl } from './components/AudioControl'
import { ClosingSection } from './components/sections/ClosingSection'
import { CoupleSection } from './components/sections/CoupleSection'
import { EventSection } from './components/sections/EventSection'
import { GallerySection } from './components/sections/GallerySection'
import { GiftSection } from './components/sections/GiftSection'
import { OpeningCover } from './components/sections/OpeningCover'
import { ParallaxHero } from './components/sections/ParallaxHero'
import { QuoteSection } from './components/sections/QuoteSection'
import { RsvpSection } from './components/sections/RsvpSection'
import { StorySection } from './components/sections/StorySection'
import { WishesSection } from './components/sections/WishesSection'
import { weddingData as data } from './data/weddingData'
import { useBackgroundAudio } from './hooks/useBackgroundAudio'
import { useReveal } from './hooks/useReveal'

function App() {
  const [opened, setOpened] = useState(false)
  useReveal()
  const { audioRef, playing, available, errored, attemptPlay, toggle } = useBackgroundAudio(data.audioSrc)

  const handleOpen = () => {
    setOpened(true)
    // Called synchronously inside the button's click handler so browsers
    // that require play() within the user-gesture call stack (e.g. Safari)
    // still allow it.
    attemptPlay()
  }

  useEffect(() => {
    if (!opened) return
    const cover = document.querySelector<HTMLElement>('.opening')
    let focused = false
    const focusHero = () => {
      if (focused) return
      focused = true
      document.querySelector<HTMLElement>('#hero-title')?.focus()
    }
    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === cover && event.propertyName === 'transform') focusHero()
    }
    cover?.addEventListener('transitionend', handleTransitionEnd)
    const fallback = window.setTimeout(focusHero, 1200)
    return () => {
      cover?.removeEventListener('transitionend', handleTransitionEnd)
      window.clearTimeout(fallback)
    }
  }, [opened])

  return (
    <>
      <audio ref={audioRef} src={data.audioSrc || undefined} loop preload="metadata" />
      <OpeningCover open={opened} onOpen={handleOpen} />
      <main id="invitation" inert={!opened}>
        <ParallaxHero />
        <QuoteSection />
        <CoupleSection />
        <EventSection />
        <StorySection />
        <GallerySection />
        <RsvpSection />
        <GiftSection />
        <WishesSection />
        <ClosingSection />
      </main>
      {opened && (
        <AudioControl playing={playing} available={available && !errored} onToggle={toggle} />
      )}
    </>
  )
}

export default App
