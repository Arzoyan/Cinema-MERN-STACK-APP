import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSeats } from "../../store/seats/slice";
import { fetchSates, updateSeat } from "../../store/seats/Api";

import "./styles.css";

const bookedSeat = {
  available: "reserved",
  reserved: "available",
};

const SeatSelection = ({ movieId }) => {
  const dispatch = useDispatch();
  const seatsList = useSelector(selectSeats);

  useEffect(() => {
    dispatch(fetchSates(movieId));
  }, [dispatch, movieId]);

  const handleSeatClick = (seat) => {
    const updatedData = {
      movieId,
      seatNumber: seat.seatNumber,
      status: bookedSeat[seat.status],
    };
    dispatch(updateSeat({ id: movieId, updatedData }));
  };

  return (
    <div>
      <div className="seats-grid">
        {seatsList.map((seat, i) => (
          <button
            key={i}
            className={`${seat.status !== "available" ? "booked" : ""}  `}
            onClick={(e) => {
              e.preventDefault;
              handleSeatClick(seat);
            }}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;
