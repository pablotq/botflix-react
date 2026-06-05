import type { KeyboardEvent } from 'react'

type SearchCardProps = {
  mood: string
  loading: boolean
  onMoodChange: (value: string) => void
  onMoodKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  onSearch: () => void
}

const examples = [
  'Quero algo engraçado para relaxar depois do trabalho',
  'Estou procurando um thriller que me deixe na ponta da cadeira',
  'Algo romântico para assistir com minha namorada',
]

export function SearchCard({
  mood,
  loading,
  onMoodChange,
  onMoodKeyDown,
  onSearch,
}: SearchCardProps) {
  return (
    <section className="search-card">
      <div className="search-content">
        <div className="input-container">
          <textarea
            id="mood-textarea"
            rows={3}
            value={mood}
            onChange={(event) => onMoodChange(event.target.value)}
            onKeyDown={onMoodKeyDown}
            placeholder="Digite como você está se sentindo ou quer assistir..."
            className="mood-textarea"
            aria-label="Descreva seu humor ou preferência de filme"
            aria-describedby="mood-examples"
          />
        </div>

        <div className="examples">
          <h3 className="examples-title">Exemplos:</h3>
          <ul id="mood-examples" className="examples-list">
            {examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </div>

        <button
          id="search-button"
          type="button"
          className="search-button"
          onClick={onSearch}
          disabled={loading}
        >
          <span className="play-icon" aria-hidden="true">
            &#9654;
          </span>
          {loading ? ' Buscando...' : 'Encontrar a Sugestão Perfeita'}
        </button>
      </div>
    </section>
  )
}
