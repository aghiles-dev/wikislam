import { RevelationPlace } from '../../domain/SurateState'

export interface SurateDTO {
  id: number
  chapter_number: number
  bismillah_pre: boolean
  revelation_order: number
  revelation_place: RevelationPlace
  name_arabic: string
  name_simple: string
  verses_count: number
  translated_name: {
    language_name: string
    name: string
  }
}
