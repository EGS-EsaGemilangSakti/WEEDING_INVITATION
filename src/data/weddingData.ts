const assetBase = `${import.meta.env.BASE_URL}Jawa_Modern_Parallax_Asset_Pack`

export const weddingData = {
  couple: {
    shortNames: 'Arga & Kirana',
    groom: { name: 'Arga', fullName: 'Arga Pradana', parents: 'Putra dari Bapak [Nama Ayah] & Ibu [Nama Ibu]' },
    bride: { name: 'Kirana', fullName: 'Kirana Ayuningtyas', parents: 'Putri dari Bapak [Nama Ayah] & Ibu [Nama Ibu]' },
  },
  dateISO: '2030-12-12T08:00:00+07:00',
  endDateISO: '2030-12-12T14:00:00+07:00',
  dateLabel: 'Minggu, 12 Desember 2030',
  timezone: 'WIB',
  quote: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    translation: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },
  events: [
    { name: 'Akad Nikah', time: '08.00–10.00 WIB', venue: '[Nama Venue Akad]', address: '[Alamat lengkap perlu diganti]' },
    { name: 'Resepsi', time: '11.00–14.00 WIB', venue: '[Nama Venue Resepsi]', address: '[Alamat lengkap perlu diganti]' },
  ],
  calendar: {
    title: 'The Wedding of Arga & Kirana',
    description: 'Undangan pernikahan Arga & Kirana.',
  },
  mapsUrl: '', // TODO(owner): isi URL Google Maps asli
  rsvpWhatsapp: '', // TODO(owner): isi nomor WhatsApp format internasional
  story: [
    { year: '2024', title: 'Pertama Bertemu', text: 'Sebuah pertemuan sederhana membuka awal perjalanan kami.' },
    { year: '2027', title: 'Menumbuhkan Cerita', text: 'Hari-hari yang dilalui bersama mengajarkan arti pulang dan bertumbuh.' },
    { year: '2030', title: 'Menuju Selamanya', text: 'Dengan restu keluarga, kami memilih melanjutkan cerita dalam ikatan pernikahan.' },
  ],
  gallery: [
    { src: `${assetBase}/09-gallery-walk.webp`, alt: 'Arga dan Kirana berjalan bersama dalam busana Jawa modern', width: 869, height: 1810 },
    { src: `${assetBase}/10-gallery-editorial.webp`, alt: 'Potret editorial Arga dan Kirana', width: 1537, height: 1023 },
    { src: `${assetBase}/11-gallery-closeup.webp`, alt: 'Potret dekat pasangan Arga dan Kirana', width: 1122, height: 1402 },
  ],
  gifts: [
    { bank: '[Nama Bank]', account: '[Nomor rekening perlu diganti]', holder: '[Nama pemilik rekening]' },
  ],
  sampleWishes: [
    { name: 'Keluarga & Sahabat', message: 'Semoga hari bahagia ini menjadi awal rumah tangga yang penuh kasih.' },
  ],
  audioSrc: `${import.meta.env.BASE_URL}music/alex-morgan-wedding-instrumental-vow-exchange-578502.mp3`,
  assets: { cover: `${assetBase}/08-opening-cover.webp`, heroBase: assetBase },
} as const

export type WeddingData = typeof weddingData
