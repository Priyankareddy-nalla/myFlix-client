export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img height={300} src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Director-Bio:</span>
        <span>{movie.Director.Bio}</span>
      </div>

      <button onClick={onBackClick}>Back</button>
    </div>
  );
};