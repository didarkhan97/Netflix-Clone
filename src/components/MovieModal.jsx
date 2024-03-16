import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const API_KEY = '752b970cec4aabadd07daa53377c3e90';

function MovieModal({ movie, onClose }) {
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US&api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie videos');
                }
                const data = await response.json();
                // Filter video results to get trailer
                const trailerData = data.results.find(video => video.type === 'Trailer');
                if (trailerData) {
                    setTrailer(`https://www.youtube.com/watch?v=${trailerData.key}`);
                } else {
                    setTrailer(null);
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchTrailer();

        // Cleanup function
        return () => {
            setTrailer(null); // Reset trailer state when component unmounts
        };
    }, [movie.id]);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                {trailer && <ReactPlayer url={trailer} controls />}
            </div>
        </div>
    );
}

export default MovieModal;
