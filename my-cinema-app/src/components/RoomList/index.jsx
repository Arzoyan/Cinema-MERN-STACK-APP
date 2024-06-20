import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomStatus, selectRooms } from "../../store/room/slice";
import { fetchRooms } from "../../store/room/Api";

import "./styles.css";

const RoomList = ({ onSelectRoom, roomId }) => {
  const rooms = useSelector(selectRooms);
  const roomStatus = useSelector(selectRoomStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomStatus === "idle") {
      dispatch(fetchRooms());
    }
  }, [roomStatus, dispatch]);

  if (roomStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="tabs">
        {rooms.map((room) => (
          <li
            key={room._id}
            onClick={() => {
              onSelectRoom(room._id);
            }}
            className={room._id === roomId ? `active` : ""}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
