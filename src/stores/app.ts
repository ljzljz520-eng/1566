import { defineStore } from 'pinia'
import type { LocaleType } from '@/i18n'
import { setLocale } from '@/i18n'

interface AppState {
  locale: LocaleType
  sidebarCollapsed: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    locale: localStorage.getItem('locale') as LocaleType || 'zh-CN',
    sidebarCollapsed: false
  }),

  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale
      setLocale(locale)
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
})
