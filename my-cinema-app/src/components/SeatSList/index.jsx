import { useSelector, useDispatch } from "react-redux";
import { selectSeats, selectStatus } from "../../store/seats/slice";
import { updateSeat } from "../../store/seats/Api";

import "./styles.css";
import Loader from "../Loader";

const bookedSeat = {
  available: "reserved",
  reserved: "available",
};

const SeatSelection = ({ movieId }) => {
  const dispatch = useDispatch();
  const seatsList = useSelector(selectSeats);
  const seatsStatus = useSelector(selectStatus);

  const handleSeatClick = (seat) => {
    const updatedData = {
      movieId,
      seatNumber: seat.seatNumber,
      status: bookedSeat[seat.status],
    };
    dispatch(updateSeat({ id: movieId, updatedData }));
  };

  if (seatsStatus === "loading") {
    return (
      <div className="loading-wrapper">
        <Loader />;
      </div>
    );
  }

  return (
    <div>
      <div className="seats-grid">
        {seatsList.map((seat, i) =>
          seat.seatNumber === seatsStatus ? (
            <Loader key={seat.seatNumber} />
          ) : (
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
          ),
        )}
      </div>
    </div>
  );
};

export default SeatSelection;
