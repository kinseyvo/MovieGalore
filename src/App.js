import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';
const URL = "http://www.omdbapi.com?apikey";
const API_KEY = process.env.REACT_APP_API_KEY;
//const API_KEY = import.meta.env.REACT_APP_API_KEY;

// const movie1 = {
//     "Title": "The Batman",
//     "Year": "2022",
//     "imdbID": "tt1877830",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
// }

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${URL}=${API_KEY}&s=${title}`);

        const data = await response.json();

        //console.log(data.Search);
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Batman');
    }, []);

    return (
        <div className="app">
            <h1>MovieGalore</h1>

            <div className="search">
                <input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies/media found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;