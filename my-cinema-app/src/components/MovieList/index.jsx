import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../store/movie/Api";
import {
  selectMoviesByRoom,
  selectMoviesStatus,
} from "../../store/movie/slice";

import "./styles.css";

const MovieList = ({ roomId, onSelectMovie, movieId }) => {
  const movies = useSelector((state) => selectMoviesByRoom(state));
  const moviesStatus = useSelector((state) => selectMoviesStatus(state));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(moviesStatus, "moviesStatus");

    dispatch(fetchMovies(roomId));
  }, [roomId]);

  console.log(movies, "movies");
  if (moviesStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="contents">
        {movies.map((movie) => (
          <li
            key={movie._id}
            onClick={() => onSelectMovie(movie._id)}
            className={`box ${movieId === movie._id ? " active " : ""}`}
          >
            <h3>
              {movie.title} - {movie.time}
            </h3>
            {movie.image && (
              <img
                src={movie.image}
                alt={movie.title}
                style={{ width: "100%" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
