import { useSelector } from "react-redux";
import {
  selectMoviesByRoom,
  selectMoviesStatus,
} from "../../store/movie/slice";
import { useDispatch } from "react-redux";
import "./styles.css";
import { fetchSeats } from "../../store/seats/Api";
import Loader from "../Loader";

const MovieList = ({ onSelectMovie, movieId }) => {
  const movies = useSelector(selectMoviesByRoom);
  const moviesStatus = useSelector(selectMoviesStatus);
  const dispatch = useDispatch();

  if (moviesStatus === "loading") {
    return (
      <div className="loading-wrapper">
        <Loader />;
      </div>
    );
  }

  return (
    <div>
      <ul className="contents">
        {movies.map((movie) => (
          <li
            key={movie._id}
            onClick={() => {
              onSelectMovie(movie._id);
              dispatch(fetchSeats(movie._id));
            }}
            className={`box ${movieId === movie._id ? " active " : ""}`}
          >
            {movie.image && (
              <img
                src={`http://localhost:4000/img/movies/${movie.image}`}
                alt={movie.title}
                style={{ width: "100%" }}
              />
            )}
            <h3>
              {movie.title} - {movie.time}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
