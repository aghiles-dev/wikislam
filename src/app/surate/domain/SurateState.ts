export type RevelationPlace = 'makkah' | 'madinah'

export interface SurateState {
  id: number
  surateNumber: number
  beginsWithBismillah: boolean
  revelationOrder: number
  revelationPlace: RevelationPlace
  name: string
  arabicName: string
  frenchName: string
  numberOfVerses: number
}

export class SuratesBuilder {
  private surate: SurateState = {
    id: 0,
    surateNumber: 0,
    beginsWithBismillah: false,
    revelationOrder: 0,
    revelationPlace: 'makkah',
    name: '',
    arabicName: '',
    frenchName: '',
    numberOfVerses: 0
  }

  withId(id: number) {
    this.surate.id = id
    return this
  }

  withSurateNumber(surateNumber: number) {
    this.surate.surateNumber = surateNumber
    return this
  }

  withBeginsWithBismillah(beginsWithBismillah: boolean) {
    this.surate.beginsWithBismillah = beginsWithBismillah
    return this
  }

  withRevelationOrder(revelationOrder: number) {
    this.surate.revelationOrder = revelationOrder
    return this
  }

  withRevelationPlace(revelationPlace: RevelationPlace) {
    this.surate.revelationPlace = revelationPlace
    return this
  }

  withName(name: string) {
    this.surate.name = name
    return this
  }

  withArabicName(arabicName: string) {
    this.surate.arabicName = arabicName
    return this
  }

  withFrenchName(frenchName: string) {
    this.surate.frenchName = frenchName
    return this
  }

  withnumberOfVerses(numberOfVerses: number) {
    this.surate.numberOfVerses = numberOfVerses
    return this
  }

  build(): SurateState {
    return this.surate
  }
}