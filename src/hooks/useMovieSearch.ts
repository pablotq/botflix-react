import { useCallback, useState, type KeyboardEvent } from 'react'
import type { Movie, MovieSearchResponse } from '../types/movie'
import type { TranslationKey } from '../i18n'

const MOVIE_RECOMMENDATION_ENDPOINT = 'https://vifivo9321.app.n8n.cloud/webhook/botflix'

// Encapsula a chamada HTTP e retorna o primeiro resultado disponível.
async function fetchMovieRecommendation(prompt: string): Promise<Movie | null> {
  const response = await fetch(MOVIE_RECOMMENDATION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userPrompt: prompt }),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const data = (await response.json()) as MovieSearchResponse
  return Array.isArray(data.results) ? data.results[0] ?? null : null
}

export function useMovieSearch(t: (key: TranslationKey) => string) {
  // Mantém o estado da busca separado da camada de apresentação.
  const [mood, setMood] = useState('')
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = useCallback(async (): Promise<void> => {
    const trimmedMood = mood.trim()

    if (!trimmedMood) {
      setError(t('noInputError'))
      setMovie(null)
      return
    }

    setLoading(true)
    setError('')

    try {
      const recommendation = await fetchMovieRecommendation(trimmedMood)

      if (!recommendation) {
        setMovie(null)
        setError(t('noResultError'))
        return
      }

      setMovie(recommendation)
    } catch (fetchError) {
      console.error('Erro ao buscar o filme:', fetchError)
      setMovie(null)
      setError(t('fetchError'))
    } finally {
      setLoading(false)
    }
  }, [mood, t])

  const handleMoodKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== 'Enter' || event.shiftKey) {
        return
      }

      event.preventDefault()
      void handleSearch()
    },
    [handleSearch],
  )

  return {
    mood,
    movie,
    loading,
    error,
    setMood,
    handleSearch,
    handleMoodKeyDown,
  }
}
