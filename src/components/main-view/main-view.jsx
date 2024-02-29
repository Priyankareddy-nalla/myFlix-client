

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";




export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-app-deh4.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {


        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,

            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio
            },
            ImagePath: movie.ImagePath
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);



  if (selectedMovie) {
    const similarMovies = movies.filter((movie) => {
      return movie._id !== selectedMovie._id && movie.Genre.Name === selectedMovie.Genre.Name;
    });

    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)} />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);

            }}

          />
        ))}

      </>

    )
  };


  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};