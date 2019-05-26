import { SuratesListRepository } from '../../domain/ports/SuratesListRepository'
import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { Observable, of } from 'rxjs'
import { SuratesBuilder, SurateState } from '../../../surate/domain/SurateState'
import { SurateDTO } from '../DTO/SurateDTO'
import { map } from 'rxjs/operators'

export class RxjsSuratesListRepository implements SuratesListRepository{

  constructor(private httpClient: HttpClient) {}

  fetchAllSurates(): Observable<SurateState[]> {
    return this.httpClient.fetch<SurateDTO[]>('chapters?language=fr').pipe(
      map(this.mapSuratesListDtoToSuratesList)
    )
  }

  private mapSuratesListDtoToSuratesList(suratesListDTO) {
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