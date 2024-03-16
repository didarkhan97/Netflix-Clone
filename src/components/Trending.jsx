import React, { useState } from 'react';
import MovieModal from './MovieModal';

function Trending({ movies, onPlayClick }) {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(selectedMovie === movie ? null : movie);
    };

    return (
        <section className="movie-section">
            <h2>Trending</h2>
            <div className="movie-container">
                {movies.slice(0, 5).map(movie => (
                    <div className="movie" key={movie.id} onClick={() => handleMovieClick(movie)}>
                        <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
                        {selectedMovie === movie && (
                            <MovieModal movie={movie} onClose={() => setSelectedMovie(null)} />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Trending;
