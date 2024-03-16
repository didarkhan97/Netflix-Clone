import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NewReleases from './components/NewReleases';
import Trending from './components/Trending';
import { getNewReleases, getTrendingMovies, getVideoFromMovieId } from './api/movieApi';

function App() {
    const [newReleases, setNewReleases] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        // Fetch new releases and trending movies when component mounts
        fetchNewReleases();
        fetchTrendingMovies();
    }, []);

    const fetchNewReleases = async () => {
        try {
            const releases = await getNewReleases();
            setNewReleases(releases);
        } catch (error) {
            console.error('Error fetching new releases:', error);
        }
    };

    const fetchTrendingMovies = async () => {
        try {
            const trending = await getTrendingMovies();
            setTrendingMovies(trending);
        } catch (error) {
            console.error('Error fetching trending movies:', error);
        }
    };

    const handlePlayClick = async movieId => {
        try {
            const videoData = await getVideoFromMovieId(movieId);
            // Extract trailer URL from videoData and handle playback
            console.log('Video data:', videoData);
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    const handleSearchSelect = (movie) => {
        // Handle the selection of a movie from the search results
        console.log('Selected movie:', movie);
    };

    return (
        <main>
            <Header movies={[...newReleases, ...trendingMovies]} onSearchSelect={handleSearchSelect} />
            <section id="hero">
                <div className="container">
                    {/* Hero section content */}
                </div>
            </section>
            <NewReleases movies={newReleases} onPlayClick={handlePlayClick} />
            <Trending movies={trendingMovies} onPlayClick={handlePlayClick} />
        </main>
    );
}

export default App;
