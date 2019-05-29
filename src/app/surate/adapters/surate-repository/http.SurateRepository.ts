import { SurateRepository } from '../../domain/ports/SurateRepository'
import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { forkJoin, Observable, of } from 'rxjs'
import { EnvHandler, EnvKey } from '../../../shared/domain/ports/EnvHandler'
import { CacheHandler } from '../../domain/ports/CacheHandler'
import { Verse, VerseBuilder } from '../../domain/Verse'
import { SurateContentDTO } from '../DTO/SurateContentDTO'
import { VerseDTO } from '../DTO/VerseDTO'
import { map, mergeMap } from 'rxjs/operators'

export class HttpSurateRepository implements SurateRepository {
  private CHAPTER_ID_PLACEHOLDER = '{chapterId}'
  private BASE_URL = `/chapters/${this.CHAPTER_ID_PLACEHOLDER}/verses?translations=31&language=fr&text_type=words&limit=${this.envHandler.get(EnvKey.VERSES_LIMIT)}`

  constructor(private httpClient: HttpClient,
              private envHandler: EnvHandler,
              private cacheHandler: CacheHandler) {

  }

  fetchById(surateId: number): Observable<Verse[]> {
    const url = this.BASE_URL.replace(this.CHAPTER_ID_PLACEHOLDER, surateId.toString())

    if (this.cacheHandler.get<Verse[]>(url) !== undefined) {
      return of(this.cacheHandler.get<Verse[]>(url) as Verse[])
    }

    return this.httpClient.fetch<SurateContentDTO>(url).pipe(
      mergeMap((surateContentDTO: SurateContentDTO) => {
        const emptyArrayOfTotalPagesElements = new Array(surateContentDTO.meta.total_pages)
        return forkJoin(
          emptyArrayOfTotalPagesElements.map((_, index) => {
            return this.httpClient.fetch<SurateContentDTO>(`${url}&page=${index + 1}`)
          })
        ).pipe(
          map(result => {
            console.log(result)
            let verses: Verse[] = []
            result.map((surateContentDTO: SurateContentDTO) => {
              verses = verses.concat(surateContentDTO.verses.map(this.mapVerseDtoToVerse))
            })
            this.cacheHandler.set<Verse[]>(url, verses)
            return verses
          })
        )
      })
    )
  }

  private mapVerseDtoToVerse(verseDTO: VerseDTO): Verse {
    return new VerseBuilder()
      .withId(verseDTO.id)
      .withVerseNumber(verseDTO.verse_number)
      .withChapterId(verseDTO.chapter_id)
      .withVerseKey(verseDTO.verse_key)
      .withArabicText(verseDTO.text_madani)
      .withFrenchText(verseDTO.translations[0].text)
      .withJuzNumber(verseDTO.juz_number)
      .withHizbNumber(verseDTO.hizb_number)
      .withSajdah(verseDTO.sajdah || false)
      .build()
  }


}