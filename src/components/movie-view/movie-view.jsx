import { Card, Col, Container, CardGroup, CardBody, CardText } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <CardGroup>
      <Card>
        <CardBody>
          <Card.Title><h4 style={{ color: "blue" }}>{movie.Title}</h4></Card.Title>
          <Card.Img variant="left" height={400} src={movie.ImagePath} />
          <CardText><h6>Description: </h6>{movie.Description} </CardText>
          <CardText><h6>Genre: </h6>{movie.Genre.Name} </CardText>
          <CardText><h6>Director: </h6>{movie.Director.Name} </CardText>
          <CardText><h6>Director: </h6>{movie.Director.Name} </CardText>
          <CardText><h6>Director-Bio: </h6>{movie.Director.Bio} </CardText>
          <Button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</Button>
        </CardBody>
      </Card>
    </CardGroup>
  );
  };

