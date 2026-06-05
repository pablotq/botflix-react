export type Movie = {
  title?: string
  name?: string
  poster_path?: string
  overview?: string
  vote_average?: number
}

export type MovieSearchResponse = {
  results?: Movie[]
}
