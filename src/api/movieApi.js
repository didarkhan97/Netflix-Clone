const API_KEY = '752b970cec4aabadd07daa53377c3e90'; 

export const getNewReleases = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch new releases');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getTrendingMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch trending movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw new Error(error.message);
    }
};

// movieApi.js

export const getVideoFromMovieId = async (movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie videos');
        }
        const data = await response.json();
        // Filter video results to get trailer
        const trailer = data.results.find(video => video.type === 'Trailer');
        return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (error) {
        throw new Error(error.message);
    }
};
