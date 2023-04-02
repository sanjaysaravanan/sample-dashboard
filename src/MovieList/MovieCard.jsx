import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const MovieCard = ({
  id,
  tech = '2D',
  title = '',
  language = 'English',
  rating = 'U',
  image = '',
  genre = '',
  removeMovie,
}) => {
  return (
    <div style={{
      width: '230px',
      margin: 8,
      textAlign: 'center',
      border: '1px solid grey',
      position: 'relative'
    }} >
      <Link to={`/movies/editMovie/${id}`} >
        <span
          style={{
            position: 'absolute',
            top: '40px',
            right: '10px',
            cursor: 'pointer'
          }}
          onClick={() => undefined}
        >
          <EditIcon
            color="primary"
          />
        </span>
      </Link>

      <span
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer'
        }}
        onClick={() => removeMovie(title)}
      >
        <DeleteIcon
          color="primary"
        />
      </span>
      <img src={image} alt={title} style={{ height: '278px', width: '230px' }} />
      <Typography variant="h5" noWrap >{title}</Typography>
      <Typography variant="h6" sx={{
        color: '#757575'
      }}>{language} | {rating}</Typography>
      <Link
        to={`/movies/${id}`} // /movies/<id>
        style={{ textDecoration: 'none' }}
      >
        <Button
          variant='contained'
          // component attribute/props
          color='primary'
          fullWidth
          sx={{
            // css property color
            color: 'white',
          }}
        >
          Book
        </Button>
      </Link>
    </div >
  )
}

export default MovieCard;