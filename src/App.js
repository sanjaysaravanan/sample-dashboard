// default React package Import
import * as React from 'react';

// External package Imports 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom Module Imports
import './App.css';
import MovieList from './MovieList/MovieList';
import AddMovie from './MovieList/AddMovie';
import Movie from './MovieList/Movie';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#FFC20E',
    },
    secondary: {
      main: '#448aff',
    }
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          borderRadius: 0
        },
      },
    },
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies" >
              <Route index element={<MovieList />} />
              {/* Path Params Child should come alogn with /<parent-paths> */}
              <Route path="/movies/:movieId" element={<Movie />} />
              <Route path="addMovie" element={<AddMovie />} />
              <Route path="/movies/editMovie/:movieId" element={<AddMovie />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
