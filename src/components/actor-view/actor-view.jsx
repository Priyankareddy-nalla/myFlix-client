import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

export const ActorView = ({ movies }) => {
    const { actorId } = useParams();
    const [actor, setActor] = useState(null);

    useEffect(() => {
        // Find actor in movies data
        let foundActor = null;

        for (const movie of movies) {
            if (movie.Actors) {
                foundActor = movie.Actors.find(actorInMovie => actorInMovie._id === actorId);
                if (foundActor) break;
            }
        }
        setActor(foundActor);
    }, [actorId, movies]);

    if (!actor) {
        return <p className="m-5">Loading actor details...</p>;
    }

    // Get all movies for particular actor
    const actorMovies = movies.filter(movie =>
        movie.Actors?.some(actorInMovie => actorInMovie._id === actor._id)
    );


    return (
        <Row className="my-5 justify-content-center">
            <Col md={4} className="text-center">
                <img
                    src={actor.ImagePath}
                    alt={actor.name}
                    className="img-fluid rounded mb-3"
                />
            </Col>
            <Col md={6}>
                <h2>{actor.name}</h2>
                <p>{actor.Bio || "No biography available."}</p>
                <h6>Birthdate: {actor.Dob}</h6>

                <h6>Movies Featuring {actor.name}:</h6>
                <ul>
                    {actorMovies.map(movie => (
                        <li key={movie._id}>
                            <Link to={`/movies/${movie._id}`} style={{ color: 'white' }} >{movie.Title} </Link>
                        </li>
                    ))}
                </ul>


                <Link to="/">
                    <Button className="mt-3" variant="secondary">Back to Main</Button>
                </Link>
            </Col>
        </Row>
    );
};
