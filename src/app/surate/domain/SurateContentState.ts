import { Verse, VerseDTO } from './Verse'

export interface SurateContentState {
  verses: Verse[],
  isLoading: boolean
}

export interface SurateContentDTO {
  verses: VerseDTO[],
  meta: {
    total_count: number
  }
}