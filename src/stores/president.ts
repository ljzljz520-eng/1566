import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { President, FilterOptions } from '../types/president'
import presidentsData from '../data/presidents'

export const usePresidentStore = defineStore('president', () => {
  const presidents = ref<President[]>(presidentsData)
  const filterOptions = ref<FilterOptions>({
    searchText: '',
    party: '',
    startYear: null,
    endYear: null
  })

  const filteredPresidents = computed(() => {
    return presidents.value.filter(president => {
      if (filterOptions.value.searchText) {
        const searchLower = filterOptions.value.searchText.toLowerCase()
        const matchesName = president.name.toLowerCase().includes(searchLower) ||
                           president.nameEn.toLowerCase().includes(searchLower)
        if (!matchesName) return false
      }

      if (filterOptions.value.party && president.party !== filterOptions.value.party) {
        return false
      }

      if (filterOptions.value.startYear && president.termStart < filterOptions.value.startYear) {
        return false
      }

      if (filterOptions.value.endYear) {
        const endYear = president.termEnd || new Date().getFullYear()
        if (endYear > filterOptions.value.endYear) {
          return false
        }
      }

      return true
    })
  })

  const getPresidentById = (id: number) => {
    return presidents.value.find(p => p.id === id)
  }

  const setFilter = (options: Partial<FilterOptions>) => {
    filterOptions.value = { ...filterOptions.value, ...options }
  }

  const resetFilter = () => {
    filterOptions.value = {
      searchText: '',
      party: '',
      startYear: null,
      endYear: null
    }
  }

  const totalYearsInOffice = computed(() => {
    return presidents.value.reduce((total, president) => {
      const end = president.termEnd || new Date().getFullYear()
      return total + (end - president.termStart)
    }, 0)
  })

  return {
    presidents,
    filterOptions,
    filteredPresidents,
    totalYearsInOffice,
    getPresidentById,
    setFilter,
    resetFilter
  }
})
