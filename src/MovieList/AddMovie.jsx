import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Box
} from '@mui/material';
import { useParams } from 'react-router-dom';

/**
 * Movie Details
 *  1. Title
 *  2. Language
 *  3. Rating
 *  4. Genere
 *  5. Timing
 */

export default function AddMovie() {

  const { movieId } = useParams();

  console.log('Url ID', movieId)

  const [data, setData] = useState({
    title: '',
    image: '',
    id: '',
    trailer: '',
    language: '',
    rating: '',
    genre: 'Thriller',
  });

  // single function to handle all the states
  const handleState = (name, value) => {
    setData({
      ...data,
      [name]: value
    })
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    if (movieId) {
      fetch('https://63f9bdce897af748dcc2d723.mockapi.io/movies/' + movieId, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    } else {
      fetch('https://63f9bdce897af748dcc2d723.mockapi.io/movies/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    setData({
      title: '',
      image: '',
      id: '',
      trailer: '',
      language: 'English',
      rating: '',
      genre: 'Thriller',
    });
  }

  useEffect(() => {
    if (movieId)
      fetch('https://63f9bdce897af748dcc2d723.mockapi.io/movies/' + movieId)
        .then(response => response.json())
        .then(movieData => {
          setData(movieData);
        });
  }, [movieId]);

  console.log()

  return (
    <Box
      m={3} // 3 * (1rem/2)
    >
      {console.log(data)}
      <form onSubmit={handleSubmit} >
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Movie Title"
          type="text"
          fullWidth
          variant="standard"
          color='secondary'
          required
          size='small'
          // defaultValue={currMovie?.title || ''}
          value={data.title}
          onChange={(e) => {
            handleState('title', e.target.value)
          }}
        />
        <TextField
          id="image"
          name="image"
          label="Movie Image"
          type="text"
          fullWidth
          variant="standard"
          color='secondary'
          required
          size='small'
          value={data.image}
          onChange={(e) => {
            handleState('image', e.target.value)
          }}
        />
        <TextField
          id="trailer"
          name="trailer"
          label="Trailer"
          type="text"
          fullWidth
          variant="standard"
          color='secondary'
          required
          size='small'
          value={data ? data.trailer : ''}
          onChange={(e) => {
            handleState('trailer', e.target.value)
          }}
        />
        <FormControl
          variant="standard"
          fullWidth
          color="secondary"
          sx={{
            mt: 1
          }}
        >
          <InputLabel id="lang">Language</InputLabel>
          <Select
            labelId="lang"
            id="lang"
            value={data.language}
            onChange={(e) => {
              handleState('language', e.target.value)
            }}
            label="Language"
            name='language'
            required
            fullWidth
          >
            <MenuItem value={'Hindi'}>Hindi</MenuItem>
            <MenuItem value={'English'}>English</MenuItem>
            <MenuItem value={'Tamil'}>Tamil</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          required
          color="secondary"
          sx={{
            mt: 1
          }}
        >
          <FormLabel id="rating">Rating</FormLabel>
          <RadioGroup
            aria-labelledby="rating"
            name="rating"
            row
            value={data.rating}
            onChange={(e) => {
              handleState('rating', e.target.value)
            }}
          >
            <FormControlLabel value="U" control={<Radio />} label="U" />
            <FormControlLabel value="U/A" control={<Radio />} label="U/A" />
            <FormControlLabel value="A" control={<Radio />} label="A" />
          </RadioGroup>
        </FormControl>
        <FormControl
          variant="standard"
          fullWidth
          color="secondary"
          sx={{
            mt: 1
          }}
        >
          <InputLabel id="genre">Genre</InputLabel>
          <Select
            labelId="genre"
            id="genre"
            value={data.genre}
            onChange={(e) => {
              handleState('genre', e.target.value)
            }}
            label="Genre"
            name='genre'
            required
            fullWidth
          >
            <MenuItem value={'Action'}>Action</MenuItem>
            <MenuItem value={'Thriller'}>Thriller</MenuItem>
            <MenuItem value={'Romance'}>Romance</MenuItem>
            <MenuItem value={'Comedy'}>Comedy</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant='contained'
          color='primary'
          sx={{
            m: 2
          }}
        >{data.id ? 'Edit' : 'Add'}</Button>
      </form>
    </Box>
  );
}