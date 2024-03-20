import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import "./main-view.scss";
import { Row } from "react-bootstrap";
import { Col, Form, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    // Connect App to API with Hook
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflix-app-deh4.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Year: movie.Year,
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Director: {
                            Name: movie.Director.Name
                        }
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    // Add Favorite Movie to list
    const addFavmovie = (id) => {

        fetch(`https://myflix-app-deh4.onrender.com/users/${user.Username}/movies/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to add");
            }
        }).then((user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                //setIsFavorite(true);
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };

    // Remove Favorite Movie from list
    const removeFavmovie = (id) => {

        fetch(`https://myflix-app-deh4.onrender.com/users/${user.Username}/movies/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to remove")
            }
        }).then((user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };

    return (
        
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }}
                setSearch={setSearch}
                setSelectedGenre={setSelectedGenre}
              />
              

            <Row className="justify-content-center my-5">
                <Routes>
                    {/* if user logged in return Signup page  */}
                    <Route
                    path="/signup"
                    element={
                        <>
                            {user? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route 
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView 
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* userlogged in then display MovieView */}
                    <Route 
                        path="/movies/:MovieId"

                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There is no movie</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView 
                                        movies={movies}
                                        removeFavmovie={removeFavmovie}
                                        addFavmovie={addFavmovie}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />




                    {/* display movicard for logged in users*/}
                    <Route 
                    path="/"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty</Col>
                            ) : (
                                <>
                                
                                    {movies.filter((movie) => {
                                        return selectedGenre === ""
                                        ? movie
                                        : movie.Genre.Name === selectedGenre;
                                    })
                                    .filter((movie) => {
                                        return search === ""
                                        ? movie
                                        : movie.Title.toLowerCase().includes(search.toLowerCase());
                                    })
                                    .map((movie, MovieId) => (
                                        <Col md={6} lg={4} xl={3} className="mb-5 col-8" key={MovieId}>
                                            <MovieCard
                                            movie={movie} 
                                            removeFavmovie={removeFavmovie} 
                                            addFavmovie={addFavmovie} 
                                            isFavorite={user.FavoriteMovies.includes(movie._id)} 
                                            />
                                        </Col>
                                     ))} 
                                </>
                            )}
                        </>
                    }
                    />
                    {/* display Profileview */}
                    <Route
                    path="/profile"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <Col>
                                    <ProfileView 
                                    user={user}
                                    movies={movies}
                                    removeFavmovie={removeFavmovie}
                                    addFavmovie={addFavmovie}
                                    setUser={setUser}
                                    />
                                </Col>
                            )}
                        </>
                    }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};


