import { defineStore } from 'pinia'
import type { President, FilterOptions } from '@/types/president'
import { presidents } from '@/assets/data/presidents'

interface PresidentState {
  list: President[]
  filteredList: President[]
  filters: FilterOptions
  currentPresident: President | null
}

export const usePresidentStore = defineStore('president', {
  state: (): PresidentState => ({
    list: presidents,
    filteredList: presidents,
    filters: {},
    currentPresident: null
  }),

  actions: {
    setFilters(filters: FilterOptions) {
      this.filters = filters
      this.applyFilters()
    },

    applyFilters() {
      let result = [...this.list]

      if (this.filters.name) {
        const keyword = this.filters.name.toLowerCase()
        result = result.filter(
          p => p.name.toLowerCase().includes(keyword) || p.nameEn.toLowerCase().includes(keyword)
        )
      }

      if (this.filters.party) {
        result = result.filter(
          p => p.party === this.filters.party || p.partyEn === this.filters.party
        )
      }

      if (this.filters.termStart) {
        result = result.filter(p => p.termStart >= this.filters.termStart!)
      }

      if (this.filters.termEnd) {
        result = result.filter(p => p.termEnd <= this.filters.termEnd!)
      }

      this.filteredList = result
    },

    resetFilters() {
      this.filters = {}
      this.filteredList = [...this.list]
    },

    getPresidentById(id: number) {
      return this.list.find(p => p.id === id) || null
    },

    setCurrentPresident(id: number) {
      this.currentPresident = this.getPresidentById(id)
    },

    getParties() {
      const parties = new Set<string>()
      this.list.forEach(p => {
        parties.add(p.party)
        parties.add(p.partyEn)
      })
      return Array.from(parties)
    }
  }
})
