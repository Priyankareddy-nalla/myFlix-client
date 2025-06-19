import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss"
import { useEffect } from "react"; // Import useEffect hooks


export const MovieView = ({ movies, removeFavmovie, addFavmovie }) => {
    const { MovieId } = useParams();
    const movie = movies.find((movie) => movie._id === MovieId);

    // Scrolls to the top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    // Similar Movies
    const selectedMovie = movies.find((movie) => movie._id === MovieId);
    const similarMovies = movies.filter((movie) => {
        return movie._id !== MovieId && movie.Genre.Name === selectedMovie.Genre.Name;
    });



    // retrieve a user object from the browser's localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // display user
    console.log(user);


    return (
        <>
            <Row className="my-5 justify-content-md-center">
                <Col md={7} className="col-12">
                    <img src={movie.ImagePath} alt="movie cover" className="mx-auto w-100" />
                </Col>
                <Col md={5} className="col-12">
                    <div className="my-1">
                        <span className="h1">{movie.Title}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Description: </span>
                        <span>{movie.Description}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Director: </span>
                        <span>{movie.Director.Name}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Actors: </span>
                        <span>{movie.Actors}</span>
                    </div>

                    <div>
                        {user.FavoriteMovies.includes(movie._id) ? (
                            <Button variant="secondary" className="my-2 me-2" style={{ color: 'white' }} on onClick={() => removeFavmovie(movie._id)}>Remove from Favoritelist</Button>
                        ) : (
                            <Button variant="secondary" className="my-2 me-2" style={{ color: 'white' }} onClick={() => addFavmovie(movie._id)}>Add to Favoritelist</Button>
                        )}
                    </div>
                    <Link to={`/`}>
                        <Button variant="secondary" className="my-2" style={{ color: 'white' }} >Back</Button>
                    </Link>
                </Col>
            </Row>
            <h2>Similar Movies</h2>
            <Row className="justify-content-center">
                {
                    similarMovies.length !== 0 ?
                        similarMovies.slice(0, 5).map((movie) => (
                            <Col sm={5} md={4} lg={3} xl={2} className="mx-2 my-3 col-6 similarmovies-img" key={movie._id}>
                                <MovieCard
                                    movie={movie}
                                    removeFavmovie={removeFavmovie}
                                    addFavmovie={addFavmovie}
                                    isFavorite={user.FavoriteMovies.includes(movie._id)}
                                />
                            </Col>
                        ))
                        : <Col>
                            <p>There are no similar Movies</p>
                        </Col>
                }
            </Row>
        </>
    );
};
