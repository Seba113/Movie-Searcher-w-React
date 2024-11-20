import { useState, useEffect, useRef, useCallback} from 'react'
import { Movies } from './components/Movies'
import {useMovies} from './hooks/useMovies.js'
import debounce from 'just-debounce-it'
import './App.css'

function useSearch (){
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=> {
    if(isFirstInput.current){
      isFirstInput.current = false
      return
    }
    if (search === '') {
      setError(null);
      return;
    }
    if(search.length < 3){
      setError('La busqueda es demasiado corta.')
      return
    }
    setError(null)
  }
  , [search])
  return {search, updateSearch, error}
}

function App() {
  const [sortBy, setSortBy] = useState('');
  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies } = useMovies({ search, sortBy });

  //Funcion debounce para evitar renderizar las movies con cada letra, usando callback nos permite evitar ese renderizado hasta que se cumpla el requisito de tiempo minimo
const debouncedGetMovies = useCallback(
  debounce (search => {
  getMovies({search})
}, 400 ) //el tiempo de espera minimo para hacer el fetch de movies
,[]
)
  
  const handleSubmit = (event)=>{
    event.preventDefault()
    getMovies({search})
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    getMovies({search: newSearch})
  } 

  const handleSort = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <>
      <div className='page'>

        <header>
            <h1>Busca tus peliculas favoritas!</h1>
            <form className='form' onSubmit={handleSubmit}>
              <input onChange={handleChange} value={search} name="search" type="text" placeholder='Avengers, Harry Potter...'/>
              <button className='search' type='submit'>Buscar</button>
              <select value={sortBy} onChange={handleSort}>
                <option value="" disabled selected>Ordenar por...</option>
                <option value="title">Ordenar por título</option>
                <option value="year">Ordenar por año</option>
              </select>                                                                     
            </form>
             {error && <p>{error}</p>}
        </header>

        <main>
          <Movies movies={movies} search={search} />
        </main>
      </div>
    </>
  )
}

export default App
