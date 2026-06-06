import type { KeyboardEvent } from 'react'
import type { TranslationKey } from '../i18n'

type SearchCardProps = {
  mood: string
  loading: boolean
  onMoodChange: (value: string) => void
  onMoodKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  onSearch: () => void
  examples: string[]
  t: (key: TranslationKey) => string
}

export function SearchCard({
  mood,
  loading,
  onMoodChange,
  onMoodKeyDown,
  onSearch,
  examples,
  t,
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
            placeholder={t('placeholder')}
            className="mood-textarea"
            aria-label={t('ariaLabel')}
            aria-describedby="mood-examples"
          />
        </div>

        <div className="examples">
          <h3 className="examples-title">{t('examplesTitle')}</h3>
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
            &#9654;&nbsp;
          </span>
          {loading ? ` ${t('searching')}` : t('searchButton')}
        </button>
      </div>
    </section>
  )
}
