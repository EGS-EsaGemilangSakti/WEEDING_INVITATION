interface AudioControlProps {
  playing: boolean
  available: boolean
  onToggle: () => void
}

export function AudioControl({ playing, available, onToggle }: AudioControlProps) {
  if (!available) return null

  return (
    <button
      type="button"
      className={`audio-control${playing ? ' audio-control--playing' : ''}`}
      onClick={onToggle}
      aria-label={playing ? 'Jeda musik latar' : 'Putar musik latar'}
      aria-pressed={playing}
    >
      <span className="audio-control__icon" aria-hidden="true">{playing ? 'Ⅱ' : '♪'}</span>
    </button>
  )
}
