export interface Verse {
  id: number,
  verse_number: number,
  chapter_id: number,
  verseKey: string,
  arabicText: string,
  frenchText: string,
  juzNumber: number,
  hizbNumber: number,
  sajdah: boolean
}

export interface VerseDTO {
  id: number,
  verse_number: number,
  chapter_id: number,
  verse_key: string,
  text_madani: string,
  juz_number: number,
  hizb_number: number,
  sajdah: boolean | null,
  page_number: number,
  translations: [
    {
      text: string,
    }
    ]
}
