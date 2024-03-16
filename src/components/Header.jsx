import React, { useState, useEffect, useRef } from 'react';
import MovieModal from './MovieModal'; // Import the MovieModal component

function Header({ movies, onSearchSelect }) {
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const modalRef = useRef(null);

    const handleInputChange = (event) => {
        const textValue = event.target.value;
        setInputValue(textValue);

        // Filter movies based on the input value
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(textValue.toLowerCase())
        );

        // Update the search results
        setSearchResults(filteredMovies);
    };

    const handleSearchSelect = (movie) => {
        setInputValue('');
        setSearchResults([]);
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    const handleClickOutsideModal = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    // Attach click event listener to handle click outside the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideModal);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <span className="logo-text">NETFLIX CLONE</span>
            </div>
            <div className="search-bar">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                {searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map(movie => (
                            <div key={movie.id} onClick={() => handleSearchSelect(movie)}>
                                {movie.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Render MovieModal when a movie is selected */}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={closeModal}
                    modalRef={modalRef}
                />
            )}
        </header>
    );
}

export default Header;
