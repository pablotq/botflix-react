import type { Movie } from '../types/movie'

type MovieResultProps = {
  movie: Movie
}

const buildPosterUrl = (posterPath: string) => `https://image.tmdb.org/t/p/w500${posterPath}`
const getMovieTitle = (movie: Movie) => movie.title ?? movie.name ?? 'Título desconhecido'
const getResultTitle = (movie: Movie) => (movie.title ? 'Filme Perfeito para Você' : 'Série Perfeita para Você')

export function MovieResult({ movie }: MovieResultProps) {
  const title = getMovieTitle(movie)
  const posterUrl = movie.poster_path ? buildPosterUrl(movie.poster_path) : ''

  return (
    <div className="results show" aria-live="polite">
      <div className="results-header" id="results-header">
        <h2>{getResultTitle(movie)}</h2>
      </div>

      <div className="movie">
        <div className="show">
          <div id="movies-grid" className="movies-grid">
            <article className="movie-card">
              <div className="movie-poster">
                {posterUrl ? (
                  <img src={posterUrl} alt={`Cartaz de ${title}`} className="movie-poster" />
                ) : (
                  <div className="no-poster">Sem imagem disponível</div>
                )}
              </div>

              <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <p className="movie-overview">{movie.overview ?? 'Sem descrição'}</p>
                <p className="movie-rating">
                  Rating: ⭐ {movie.vote_average?.toFixed() ?? 'N/A'} / 10
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
