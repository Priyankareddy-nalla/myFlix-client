

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";



export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "RRR",
      Description: "A fearless revolutionary and an officer in the British force, who once shared a deep bond, decide to join forces and chart out an inspirational path of freedom against the despotic rulers.",
      Genre: {
        Name: "Drama",
        Description: "Films in the drama genre often include realistic settings and defining conflict between one or more characters and themselves, others or forces of nature."
      },
      Director: {
        Name: "S. S. Rajamouli",
        Bio: " He is known for his action, fantasy, and epic genre films. He is the highest grossing Indian director of all time, as well as the highest-paid director in India.",
        Birth: "1973",
      },
      ImagePath: "https://assets.thehansindia.com/h-upload/2022/03/14/1281604-whatsapp-image-2022-03-14-at-130148-9.webp",
    },


    {
      id: 2,
      Title: "Baahubali:The Beginning",
      Description: "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
      Genre: {
        Name: "Action",
        Description: "An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes).",
      },
      Director: {
        Name: "S. S. Rajamouli",
        Bio: "He is known for his action, fantasy, and epic genre films. He is the highest grossing Indian director of all time, as well as the highest-paid director in India.",
        Birth: "1973",
      },
      ImagePath: "https://resizing.flixster.com/gYemYRsEoq66ym4AU8g2MnIUr_g=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11546593_p_v8_af.jpg",
    },


    {
      id: 3,
      Title: "Moana",
      Description: "A Moana, daughter of chief Tui, embarks on a journey to return the heart of goddess Te Fitti from Maui, a demigod, after the plants and the fish on her island start dying due to a blight.",
      Genre: {
        Name: "Animated",
        Description: "Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.",
      },
      Director: {
        Name: "John Musker",
        Bio: "John Edward Musker is an American animator, film director, screenwriter, and film producer. He often collaborates with fellow director Ron Clements and is best known for writing and directing the Disney films.",
        Birth: "1953",
      },
      ImagePath: "https://lumiere-a.akamaihd.net/v1/images/p_moana_20530_214883e3.jpeg",
    },
    {
      id: 4,
      Title: "Avatar",
      Description: "Jake, a paraplegic marine, replaces his brother on the Navi-inhabited Pandora for a corporate mission. He is accepted by the natives as one of their own, but he must decide where his loyalties lie.",
      Genre: {
        Name: "Animated",
        Description: "Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.",
      },
      Director: {
        Name: "James Cameron",
        Bio: "John James Francis Cameron CC is a Canadian filmmaker. A major figure in the post-New Hollywood era, Cameron is considered one of the industrys most innovative filmmakers, regularly making use of novel technologies with a classical filmmaking style.",
        Birth: "1954",
      },
      ImagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Avatar_%282009_film%29_poster.jpg/220px-Avatar_%282009_film%29_poster.jpg",
    }

  ]);



  const [selectedMovie, setSelectedMovie] = useState(null);


  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
