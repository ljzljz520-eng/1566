import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

export type LocaleType = keyof typeof messages

const getDefaultLocale = (): LocaleType => {
  const savedLocale = localStorage.getItem('locale') as LocaleType
  if (savedLocale && messages[savedLocale]) {
    return savedLocale
  }
  const browserLang = navigator.language
  if (browserLang.startsWith('zh')) {
    return 'zh-CN'
  }
  return 'en-US'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en-US',
  messages,
  globalInjection: true
})

export const setLocale = (locale: LocaleType) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

export default i18n
