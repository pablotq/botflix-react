import robotImage from './assets/botflix-robot.jpg'
import './App.css'
import { ErrorMessage } from './components/ErrorMessage'
import { MovieResult } from './components/MovieResult'
import { SearchCard } from './components/SearchCard'
import { useMovieSearch } from './hooks/useMovieSearch'

function App() {
  // Camada de composição: exibe o layout geral e delega a lógica de busca ao hook customizado.
  const { mood, movie, loading, error, setMood, handleSearch, handleMoodKeyDown } = useMovieSearch()

  return (
    <>
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />

      <main className="container">
        <div className="main-content">
          <header className="brand-header">
            <div className="container-logo">
              <img src={robotImage} alt="Assistente robô BotFlix" className="robot-image" />
              <h1 className="brand-title">BotFlix</h1>
            </div>
            <p className="brand-subtitle">Seu assistente pessoal para encontrar filme ou série perfeitos</p>
          </header>

          <SearchCard
            mood={mood}
            loading={loading}
            onMoodChange={setMood}
            onMoodKeyDown={handleMoodKeyDown}
            onSearch={handleSearch}
          />

          <ErrorMessage message={error} />

          {movie && <MovieResult movie={movie} />}
        </div>
      </main>
    </>
  )
}

export default App
