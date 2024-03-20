import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "../movie-view/movie-view.scss"; 





export const MovieCard = ({ movie, addFavmovie, removeFavmovie, isFavorite }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
            <div className="position-relative .d-inline-block">
                <Card.Img variant="top card-img" src={movie.ImagePath} />
                <div>
                    {isFavorite ? (
                      
                        <HeartFill size={20} color="#d63384" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFavmovie(movie._id)}/>
                    ) : (
                        <Heart size={20} color="#d63384" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFavmovie(movie._id)}/>
                    )}
                </div>
            </div>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button  variant="link" style={{ color:"pink"}}>
                        See more
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired
};