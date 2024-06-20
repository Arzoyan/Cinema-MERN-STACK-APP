export const generateDefaultSeats = () => {
  const seats = [];
  const rows = 8;
  const cols = 8;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      seats.push({
        seatNumber: `${String.fromCharCode(65 + row)} ${col + 1}`,
        status: "available",
      });
    }
  }

  return seats;
};

export const updateReservedSeats = (defaultSeats, reservedSeats) => {
  reservedSeats.forEach((reservedSeat) => {
    const seatIndex = defaultSeats.findIndex(
      (seat) => seat.seatNumber === reservedSeat.seatNumber,
    );
    if (seatIndex !== -1) {
      defaultSeats[seatIndex].status = reservedSeat.status;
    }
  });

  return defaultSeats;
};
