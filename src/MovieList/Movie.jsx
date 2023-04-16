import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';


const Movie = () => {

  const [data, setData] = useState({
    title: '',
    image: '',
    id: '',
    trailer: '',
    language: '',
    rating: '',
    genre: '',
  })

  const { movieId } = useParams(); // will always be string

  // url search/query params
  const [searchParams] = useSearchParams();
  console.log('URL QUERIES', searchParams.get('name'), searchParams.get('score'));
  useEffect(() => {
    if (data.id !== movieId)
      fetch('https://63f9bdce897af748dcc2d723.mockapi.io/movies/' + movieId)
        .then(response => response.json())
        .then(movieData => setData(movieData))
  })
  return (
    <div style={{
      width: '100%',
      margin: 8,
      textAlign: 'center',
      border: '1px solid grey',
      position: 'relative'
    }} >
      <img src={data.image} alt={data.title} style={{ height: '300px', width: '100%', objectFit: 'contain' }} />
      <Typography variant="h5" noWrap >{data.title}</Typography>
      <Typography variant="h6" sx={{
        color: '#757575'
      }}>{data.language} | {data.rating}</Typography>
      <Typography variant="h6" sx={{
        color: '#757575'
      }}>{data.genre}</Typography>
      <iframe title={data.title} width="420" height="345" src={`https://www.youtube.com/embed/${data.trailer}`}>
      </iframe>
    </div >
  )
}

export default Movie;