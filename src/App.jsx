import React, { Component } from 'react';
import Header from './components/Header';
import { useState, useEffect } from 'react'


function App() {

    function getVideoFromMovieId(movieId) {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJiOTcwY2VjNGFhYmFkZDA3ZGFhNTMzNzdjM2U5MCIsInN1YiI6IjY1ZTkzMTAyNWFiYTMyMDE0OTZmNDBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.moT2K-y4iLdQoQOggMyggGb8ZiL1ZJyfp0_Tt-2KH9U'
            }
          };
          
          return fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                
                console('VIDEO:::',response)
                return response
            })
            .catch(err => console.error('asd',err));
    }


    // first api call to get all new releases
    function getNewReleases() {
        const optionsForNewReleases = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJiOTcwY2VjNGFhYmFkZDA3ZGFhNTMzNzdjM2U5MCIsInN1YiI6IjY1ZTkzMTAyNWFiYTMyMDE0OTZmNDBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.moT2K-y4iLdQoQOggMyggGb8ZiL1ZJyfp0_Tt-2KH9U'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', optionsForNewReleases)
            .then(response => response.json())
            .then(response => {
                // modify the data that's returned, and add a new video proptery by making another api call for just the video
                
                return response.results.map(movie => {
                    // if (getVideoFromMovieId(movie.id)) {
                        movie.video = getVideoFromMovieId(movie.id)
                        return movie
                    // }
                    // return movie
                });
            })
            .then(updatedData => {
                // capture the resp data
                // bring it to the UI
                setNewReleases(updatedData)
            })
            .catch(err => console.error(err));
    
    }

    // second api call to get trending moves
    function getTrendingMovies() {
        const optionsForTrending = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJiOTcwY2VjNGFhYmFkZDA3ZGFhNTMzNzdjM2U5MCIsInN1YiI6IjY1ZTkzMTAyNWFiYTMyMDE0OTZmNDBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.moT2K-y4iLdQoQOggMyggGb8ZiL1ZJyfp0_Tt-2KH9U'
            }
          };

          const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
          
          fetch(apiUrl, optionsForTrending)
            .then(response => response.json())
            .then(response => {
              // capture data from api into our own local state for the component


              setTrendingMovies(response)
            })
            .catch(err => console.error(err));

    }




    // const movieDemo = {}
    // fetch movies from api
        // api returns response data => { data...}
        // setMoviesDemo(response) => movieDemo =  { data...}


    // local state for your component 
    const [newReleases, setNewReleases] = useState({})
    const [trendingMovies, setTrendingMovies] = useState({})

    

    // make api calls for data
    useEffect(() => {
        // first api call
        getNewReleases()
        // second api call
        getTrendingMovies()

        console.log('useEffect is called')
    }, []);
    


    // listners
    const anything = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        console.log('EVT click:', evt)

    }


    console.log('render my app component w/data::', newReleases)
    return (
    <main>
        {/* header */}
        <Header />

        {/* hero section */}
        <section id="hero">
            <div className="container">
                {/* movie */}
            </div>
        </section>

        {/* new release section */}
            {/* 1 - 3 movies */}
        
        <section id='new-releases'>

            <h2>New Releases</h2>

            <div class="movie-container">
                {
                    newReleases.length &&
                    newReleases.slice(0,5).map(function(currMovie, idx) {

                        console.log('currMovie::', currMovie)
                        return (
                            <div className='movie' onClick={anything}>
                                {/* <img src={'https://image.tmdb.org/t/p/original/' + currMovie.backdrop_path} /> */}
                                <img src={'https://image.tmdb.org/t/p/original/' + currMovie.poster_path} />
                                {/* <h3>{currMovie.title}</h3> */}
                                {/* <p>{currMovie.overview}</p> */}
                                <div className='movie-info hidden'>
                                    <h3>{currMovie.title}</h3>
                                    <p>{currMovie.overview}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </section>

        
        
        {/* trending section */}
            <section id='trending'>
                
                <h2>Trending</h2>

                <div class="movie-container">
                    {
                        trendingMovies.results &&
                        trendingMovies.results.slice(0,5).map(function(currMovie, idx) {
                            return (
                                <div className='movie'>
                                    {/* <img src={'https://image.tmdb.org/t/p/original/' + currMovie.backdrop_path} /> */}
                                    <img src={'https://image.tmdb.org/t/p/original/' + currMovie.poster_path} />
                                    
                                </div>
                            )
                        })
                    }
                </div>
        </section>

    </main>
  );
}
  
export default App;