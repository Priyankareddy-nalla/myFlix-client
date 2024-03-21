

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
// import "../../index.scss"
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";




export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-app-deh4.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
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
  }, [token]);


  return (
    <Row>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={4}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            <br></br>
            <SignupView />
          </Col>

        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              key={movies.id}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
            <Row>
              <Col className="mb-5">
                <hr />
                <h3> Similar Movies </h3>
                <Row>
                  {movies
                    .filter((movie) => {
                      return (
                        movie._id !== selectedMovie._id &&
                        movie.Genre.Name === selectedMovie.Genre.Name)
                    })
                    .map((movie) => (
                      <Col key={movie.id} md={4}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                          }}
                        />
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Row>
    </Row>
  )
};
