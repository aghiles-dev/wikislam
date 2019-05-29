export interface VerseDTO {
  id: number,
  verse_number: number,
  chapter_id: number,
  verse_key: string,
  text_madani: string,
  juz_number: number,
  hizb_number: number,
  sajdah: boolean | null,
  translations: [
    {
      text: string,
    }
    ]
}