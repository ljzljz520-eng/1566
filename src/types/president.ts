export interface President {
  id: number
  name: string
  nameEn: string
  party: string
  termStart: number
  termEnd: number
  birthDate: string
  deathDate: string
  birthplace: string
  education: string
  achievements: string[]
  biography: string
  historicalBackground: string
  keyEvents: KeyEvent[]
  portrait: string
  images: string[]
  videos: string[]
  relations: Relation[]
}

export interface KeyEvent {
  year: number
  title: string
  description: string
}

export interface Relation {
  presidentId: number
  type: 'political' | 'family' | 'mentor'
  description: string
}

export type PartyType = 'federalist' | 'democraticRepublican' | 'democratic' | 'whig' | 'republican' | 'nationalUnion'
