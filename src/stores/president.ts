import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { President } from '@/types/president'
import presidentsData from '@/data/presidents'

export const usePresidentStore = defineStore('president', () => {
  const presidents = ref<President[]>(presidentsData)
  const searchQuery = ref('')
  const selectedParty = ref('')
  const selectedPresident = ref<President | null>(null)

  const parties = computed(() => {
    const partySet = new Set(presidents.value.map(p => p.party))
    return Array.from(partySet)
  })

  const filteredPresidents = computed(() => {
    let result = presidents.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.party.toLowerCase().includes(query) ||
        p.termStart.toString().includes(query) ||
        p.termEnd.toString().includes(query)
      )
    }

    if (selectedParty.value) {
      result = result.filter(p => p.party === selectedParty.value)
    }

    return result
  })

  function getPresidentById(id: number): President | undefined {
    return presidents.value.find(p => p.id === id)
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSelectedParty(party: string) {
    selectedParty.value = party
  }

  function setSelectedPresident(president: President | null) {
    selectedPresident.value = president
  }

  function resetFilters() {
    searchQuery.value = ''
    selectedParty.value = ''
  }

  return {
    presidents,
    searchQuery,
    selectedParty,
    selectedPresident,
    parties,
    filteredPresidents,
    getPresidentById,
    setSearchQuery,
    setSelectedParty,
    setSelectedPresident,
    resetFilters
  }
})
