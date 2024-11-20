function ListOfMovies ({movies}) {
    return (
        <ul className="movies">
            {
                movies.map(movie => (
                <li key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                </li>
                ))
            }
        </ul>
    )
} 

export function Movies ({movies, search}){
    
    const hasMovies = movies?.length > 0;
    if(search.length === 0) return null;
    return (
        hasMovies
        ? <ListOfMovies movies  = {movies} />
        : <p>No se encontraron resultados para esta búsqueda.</p>
        )
}