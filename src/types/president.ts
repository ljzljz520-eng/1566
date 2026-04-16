export interface President {
  id: number
  name: string
  nameEn: string
  avatar: string
  party: string
  partyEn: string
  termStart: number
  termEnd: number
  term: string
  termEn: string
  birthDate: string
  deathDate: string
  birthPlace: string
  birthPlaceEn: string
  vicePresident: string
  vicePresidentEn: string
  achievements: string[]
  achievementsEn: string[]
  biography: string
  biographyEn: string
  keyEvents: KeyEvent[]
  images: string[]
  videos: string[]
  relations: Relation[]
}

export interface KeyEvent {
  year: number
  event: string
  eventEn: string
}

export interface Relation {
  id: number
  name: string
  nameEn: string
  relation: string
  relationEn: string
}

export interface FilterOptions {
  name?: string
  party?: string
  termStart?: number
  termEnd?: number
}
