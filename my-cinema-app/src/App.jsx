import { useState } from "react";
import RoomList from "./components/RoomList";
import MovieList from "./components/MovieList";
import SeatSelection from "./components/SeatSList";

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
    setSelectedMovie(null);
  };

  const handleMovieSelect = (movieId) => {
    setSelectedMovie(movieId);
  };

  return (
    <div>
      <RoomList onSelectRoom={handleRoomSelect} roomId={selectedRoom} />
      {selectedRoom && (
        <MovieList
          roomId={selectedRoom}
          onSelectMovie={handleMovieSelect}
          movieId={selectedMovie}
        />
      )}
      {selectedRoom && selectedMovie && (
        <SeatSelection roomId={selectedRoom} movieId={selectedMovie} />
      )}
    </div>
  );
};

export default App;
