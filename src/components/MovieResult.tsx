import type { Movie } from '../types/movie'
import type { TranslationKey } from '../i18n'

type MovieResultProps = {
  movie: Movie
  t: (key: TranslationKey) => string
}

const buildPosterUrl = (posterPath: string) => `https://image.tmdb.org/t/p/w500${posterPath}`
const getMovieTitle = (movie: Movie, t: (key: TranslationKey) => string) => movie.title ?? movie.name ?? t('noTitle')
const getResultTitle = (movie: Movie, t: (key: TranslationKey) => string) =>
  movie.title ? t('perfectMovie') : t('perfectSeries')

export function MovieResult({ movie, t }: MovieResultProps) {
  const title = getMovieTitle(movie, t)
  const posterUrl = movie.poster_path ? buildPosterUrl(movie.poster_path) : ''

  return (
    <div className="results show" aria-live="polite">
      <div className="results-header" id="results-header">
        <h2>{getResultTitle(movie, t)}</h2>
      </div>

      <div className="movie">
        <div className="show">
          <div id="movies-grid" className="movies-grid">
            <article className="movie-card">
              <div className="movie-poster">
                {posterUrl ? (
                  <img src={posterUrl} alt={`Poster of ${title}`} className="movie-poster" />
                ) : (
                  <div className="no-poster">{t('noPoster')}</div>
                )}
              </div>

              <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <p className="movie-overview">{movie.overview ?? t('noOverview')}</p>
                <p className="movie-rating">
                  {t('rating')}: ⭐ {movie.vote_average?.toFixed() ?? 'N/A'} / 10
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
