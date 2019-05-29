import { VerseDTO } from './VerseDTO'

export interface SurateContentDTO {
  verses: VerseDTO[]
  meta: {
    total_pages: number
  }
}