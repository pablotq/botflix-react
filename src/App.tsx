import robotImage from './assets/botflix-robot.jpg'
import './App.css'
import { ErrorMessage } from './components/ErrorMessage'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { MovieResult } from './components/MovieResult'
import { SearchCard } from './components/SearchCard'
import { useMovieSearch } from './hooks/useMovieSearch'
import { I18nProvider, useI18n } from './i18n'

function AppContent() {
  const { t } = useI18n()
  const { mood, movie, loading, error, setMood, handleSearch, handleMoodKeyDown } = useMovieSearch(t)
  const examples = [t('example1'), t('example2'), t('example3')]

  return (
    <>
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />

      <main className="container">
        <div className="main-content">
          <header className="brand-header">
            <div className="container-logo">
              <img src={robotImage} alt={t('robotAlt')} className="robot-image" />
              <h1 className="brand-title">BotFlix</h1>
            </div>
            <LanguageSwitcher />
            <p className="brand-subtitle">{t('brandSubtitle')}</p>
          </header>

          <SearchCard
            mood={mood}
            loading={loading}
            onMoodChange={setMood}
            onMoodKeyDown={handleMoodKeyDown}
            onSearch={handleSearch}
            examples={examples}
            t={t}
          />

          <ErrorMessage message={error} />

          {movie && <MovieResult movie={movie} t={t} />}
        </div>
      </main>
    </>
  )
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}

export default App
