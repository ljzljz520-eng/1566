export interface President {
  id: number
  order: number
  name: string
  nameEn: string
  portrait: string
  party: PartyType
  termStart: number
  termEnd: number | null
  vicePresident: string
  vicePresidentEn: string
  birthDate: string
  deathDate: string | null
  birthPlace: string
  birthPlaceEn: string
  education: string
  educationEn: string
  achievements: string[]
  achievementsEn: string[]
  biography: string
  biographyEn: string
  historicalBackground: string
  historicalBackgroundEn: string
  keyEvents: KeyEvent[]
  images: MediaItem[]
  videos: MediaItem[]
  relations: Relation[]
}

export type PartyType = 
  | 'federalist'
  | 'democraticRepublican'
  | 'democratic'
  | 'republican'
  | 'whig'
  | 'nationalUnion'
  | 'independent'

export interface KeyEvent {
  year: number
  title: string
  titleEn: string
  description: string
  descriptionEn: string
}

export interface MediaItem {
  id: string
  url: string
  title: string
  titleEn: string
  description?: string
  descriptionEn?: string
}

export interface Relation {
  targetId: number
  type: 'political' | 'family' | 'rival' | 'friend'
  description: string
  descriptionEn: string
}

export interface FilterOptions {
  searchText: string
  party: PartyType | ''
  startYear: number | null
  endYear: number | null
}
