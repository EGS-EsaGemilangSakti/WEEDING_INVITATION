import { weddingData as data } from '../../data/weddingData'
import { useCountdown } from '../../hooks/useCountdown'
import { SectionHeading } from '../SectionHeading'

const pad = (value: number) => String(value).padStart(2, '0')
const toIcsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const escapeIcs = (value: string) => value
  .replace(/\\/g, '\\\\')
  .replace(/\r?\n/g, '\\n')
  .replace(/,/g, '\\,')
  .replace(/;/g, '\\;')

function buildCalendar() {
  const location = data.events.map((event) => `${event.venue}, ${event.address}`).join(' / ')
  const uid = `arga-kirana-${data.dateISO.slice(0, 10)}@wedding-invitation.local`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arga Kirana Wedding//ID',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(data.dateISO)}`,
    `DTEND:${toIcsDate(data.endDateISO)}`,
    `SUMMARY:${escapeIcs(data.calendar.title)}`,
    `DESCRIPTION:${escapeIcs(data.calendar.description)}`,
    `LOCATION:${escapeIcs(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(`${lines.join('\r\n')}\r\n`)}`
}

export function EventSection() {
  const countdown = useCountdown(data.dateISO)
  const units = { Hari: countdown.days, Jam: countdown.hours, Menit: countdown.minutes, Detik: countdown.seconds }

  return (
    <>
      <section className="save-date section" aria-labelledby="date-title">
        <SectionHeading eyebrow="Save the date" id="date-title">Hari yang Dinanti</SectionHeading>
        <p className="date-display" data-reveal>
          {data.dateLabel}
        </p>
        <div className="countdown" aria-label={countdown.ended ? 'Acara telah berlangsung' : 'Hitung mundur menuju acara'} data-reveal>
          {countdown.ended ? <p>Hari bahagia telah tiba</p> : Object.entries(units).map(([label, value]) => (
            <div key={label}><strong>{pad(value)}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>
      <section className="section events" aria-labelledby="events-title">
        <SectionHeading eyebrow="Rangkaian acara" id="events-title">Wedding Day</SectionHeading>
        <div className="events__grid">
          {data.events.map((event) => (
            <article key={event.name} data-reveal>
              <p className="eyebrow">{data.dateLabel}</p><h3>{event.name}</h3>
              <p className="event-time">{event.time}</p>
              <p><strong>{event.venue}</strong><br />{event.address}</p>
            </article>
          ))}
        </div>
        <div className="action-row">
          <a className="button" href={buildCalendar()} download="arga-kirana.ics">Simpan Tanggal</a>
          {data.mapsUrl ? <a className="button button--outline" href={data.mapsUrl} target="_blank" rel="noreferrer" aria-label="Buka lokasi acara di Google Maps">Buka Google Maps</a> : <span className="location-note">Tautan lokasi akan segera tersedia.</span>}
        </div>
      </section>
    </>
  )
}
