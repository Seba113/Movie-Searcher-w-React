import { useRef, useState, useMemo } from 'react'
import {searchMovies} from '../service/movies.js'

export function useMovies ({search, sortBy}) {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const previousSearch = useRef(search) 

    const getMovies = useMemo (() => {
    return async ({search}) => {
            if(search === previousSearch.current) return
            try{
                previousSearch.current = search
                const newMovies = await searchMovies({ search })
                setMovies(newMovies)

            }catch(e){
                setError(e.message)
            }
        }
    }, [])

    const sortedMovies = useMemo (() => {
        if (!Array.isArray(movies)) {
            return []; 
          }

        if(sortBy === 'year'){
           return [...movies].sort((a, b) => Number(a.year) - Number(b.year))
        }
        if(sortBy === 'title'){
            return [...movies].sort((a, b) => a.title.localeCompare(b.title));
        }
        return movies;
    }, [sortBy, movies]);
    return {movies: sortedMovies, getMovies};
}