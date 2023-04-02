import React, { useEffect, useState } from 'react';

// Package Imports
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

// Custom Module Import
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const removeMovie = (movieTitle) => {
    const id = movies.find(({ title }) => title === movieTitle).id;
    setMovies(movies.filter(({ title }) => title !== movieTitle));

    fetch(`https://63f9bdce897af748dcc2d723.mockapi.io/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  useEffect(() => {
    fetch('https://63f9bdce897af748dcc2d723.mockapi.io/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data));
    console.log('Mounting Called')
  }, []);



  return (
    <>
      {/* {console.log('Movies List', movies)} */}
      <Link to={'/movies/addMovie'} >
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: 'absolute',
            top: '80px',
            right: '10px'
          }}
          onClick={() => undefined}
        >
          <AddIcon color="secondary" />
        </Fab>
      </Link>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {movies.map(({ id, image, title, rating, language, genre }) => (
          <MovieCard
            id={id}
            image={image}
            title={title}
            rating={rating}
            language={language}
            genre={genre}
            key={id}
            removeMovie={removeMovie}
          />
        ))}
      </div>
    </>
  )

}

export default MovieList;