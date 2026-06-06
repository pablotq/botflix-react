import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type TranslationMap = {
  brandSubtitle: string
  placeholder: string
  ariaLabel: string
  examplesTitle: string
  example1: string
  example2: string
  example3: string
  searchButton: string
  searching: string
  noInputError: string
  noResultError: string
  fetchError: string
  perfectMovie: string
  perfectSeries: string
  noTitle: string
  noOverview: string
  noPoster: string
  rating: string
  language: string
  languageEnglish: string
  languagePortuguese: string
  robotAlt: string
}

export const translations = {
  pt: {
    brandSubtitle: 'Seu assistente pessoal para encontrar filme ou série perfeitos',
    placeholder: 'Digite como você está se sentindo ou quer assistir...',
    ariaLabel: 'Descreva seu humor ou preferência de filme',
    examplesTitle: 'Exemplos:',
    example1: 'Quero algo engraçado para relaxar depois do trabalho',
    example2: 'Estou procurando um thriller que me deixe na ponta da cadeira',
    example3: 'Algo romântico para assistir com minha namorada',
    searchButton: 'Encontrar a Sugestão Perfeita',
    searching: 'Buscando...',
    noInputError: 'Por favor, insira algo antes de buscar.',
    noResultError: 'Nenhum resultado encontrado. Tente outra descrição.',
    fetchError: 'Ocorreu um erro ao buscar o filme. Por favor, tente novamente mais tarde.',
    perfectMovie: 'Filme Perfeito para Você',
    perfectSeries: 'Série Perfeita para Você',
    noTitle: 'Título desconhecido',
    noOverview: 'Sem descrição',
    noPoster: 'Sem imagem disponível',
    rating: 'Rating',
    language: 'Idioma',
    languageEnglish: 'English',
    languagePortuguese: 'Português',
    robotAlt: 'Assistente robô BotFlix',
  },
  en: {
    brandSubtitle: 'Your personal assistant to find the perfect movie or series',
    placeholder: 'Type how you feel or what you want to watch...',
    ariaLabel: 'Describe your mood or movie preference',
    examplesTitle: 'Examples:',
    example1: 'I want something funny to relax after work',
    example2: 'Looking for a thriller that keeps me on the edge of my seat',
    example3: 'Something romantic to watch with my partner',
    searchButton: 'Find the perfect suggestion',
    searching: 'Searching...',
    noInputError: 'Please type something before searching.',
    noResultError: 'No results found. Try a different description.',
    fetchError: 'An error occurred while searching. Please try again later.',
    perfectMovie: 'Perfect Movie for You',
    perfectSeries: 'Perfect Series for You',
    noTitle: 'Unknown title',
    noOverview: 'No description',
    noPoster: 'No image available',
    rating: 'Rating',
    language: 'Language',
    languageEnglish: 'English',
    languagePortuguese: 'Portuguese',
    robotAlt: 'BotFlix robot assistant',
  },
} as const

type Locale = keyof typeof translations
export type TranslationKey = keyof TranslationMap

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt')

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key],
    [locale],
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }

  return context
}
