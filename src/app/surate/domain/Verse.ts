export interface Verse {
    id: number,
    verseNumber: number,
    chapterId: number,
    verseKey: string,
    arabicText: string,
    frenchText: string,
    juzNumber: number,
    hizbNumber: number,
    sajdah: boolean
}

export class VerseBuilder {
  private verse: Verse = {
    id: 0,
    verseNumber: 0,
    chapterId: 0,
    verseKey: '',
    arabicText: '',
    frenchText: '',
    juzNumber: 0,
    hizbNumber: 0,
    sajdah: false
  }

  withId(id: number): VerseBuilder {
    this.verse.id = id
    return this
  }

  withVerseNumber(verseNumber: number): VerseBuilder {
    this.verse.verseNumber = verseNumber
    return this
  }

  withChapterId(chapterId: number): VerseBuilder {
    this.verse.chapterId = chapterId
    return this
  }

  withVerseKey(verseKey: string): VerseBuilder {
    this.verse.verseKey = verseKey
    return this
  }

  withArabicText(arabicText: string): VerseBuilder {
    this.verse.arabicText = arabicText
    return this
  }

  withFrenchText(frenchText: string): VerseBuilder {
    this.verse.frenchText = frenchText
    return this
  }

  withJuzNumber(juzNumber: number): VerseBuilder {
    this.verse.juzNumber = juzNumber
    return this
  }

  withHizbNumber(hizbNumber: number): VerseBuilder {
    this.verse.hizbNumber = hizbNumber
    return this
  }

  withSajdah(sajdah: boolean): VerseBuilder {
    this.verse.sajdah = sajdah
    return this
  }

  build(): Verse {
    return this.verse
  }
}