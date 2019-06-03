import { SuratesListRepository } from '../../domain/ports/SuratesListRepository'
import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { Observable, of } from 'rxjs'
import { SuratesBuilder, SurateState } from '../../domain/SurateState'
import { SurateDTO } from '../DTO/SurateDTO'
import { map, tap } from 'rxjs/operators'
import { CacheHandler } from '../../../shared/domain/ports/CacheHandler'

export class HttpSuratesListRepository implements SuratesListRepository {

  constructor (private httpClient: HttpClient, private cacheHandler: CacheHandler) {
  }

  fetchAllSurates (): Observable<SurateState[]> {
    const url = 'chapters?language=fr'

    if (this.cacheHandler.get<SurateState[]>(url)) {
      return of(this.cacheHandler.get<SurateState[]>(url) as SurateState[])
    }

    return this.httpClient.fetch<{ chapters: SurateDTO[] }>(url).pipe(
      map(response => this.mapSuratesListDtoToSuratesList(response.chapters)),
      tap(suratesList => this.cacheHandler.set(url, suratesList))
    )
  }

  private mapSuratesListDtoToSuratesList (suratesListDTO) {
    return suratesListDTO.map(surate => new SuratesBuilder()
      .withId(surate.id)
      .withSurateNumber(surate.chapter_number)
      .withBeginsWithBismillah(surate.bismillah_pre)
      .withRevelationOrder(surate.revelation_order)
      .withRevelationPlace(surate.revelation_place)
      .withName(surate.name_simple)
      .withArabicName(surate.name_arabic)
      .withFrenchName(surate.translated_name.name)
      .withnumberOfVerses(surate.verses_count)
      .build())
  }
}
