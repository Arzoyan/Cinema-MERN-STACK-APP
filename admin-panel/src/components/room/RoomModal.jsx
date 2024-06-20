import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input } from "antd";
import { fetchAddRoom, fetchUpdateRoom } from "../../store/room/Api";

const RoomModal = ({ item, open, setOpen }) => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (item?.name) {
      setRoomName(item.name);
    }
  }, [item]);

  const onCloseModal = () => {
    setOpen(false);
    setRoomName("");
  };

  const onAddNewRoom = () => {
    if (!item?.name) {
      dispatch(fetchAddRoom({ name: roomName }));
    } else {
      dispatch(fetchUpdateRoom({ id: item._id, body: { name: roomName } }));
    }
    onCloseModal();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add ROOM
      </Button>
      <Modal
        title={<p>{item?.name ? "Edit Room" : "Add ROOM"}</p>}
        footer={
          <>
            <Button
              disabled={!roomName.trim()}
              type="primary"
              onClick={() => {
                onAddNewRoom();
              }}
            >
              Save
            </Button>
            <Button onClick={onCloseModal}>Cancel</Button>
          </>
        }
        open={open}
        onCancel={onCloseModal}
      >
        <h4>Room Name</h4>
        <Input
          placeholder="Basic usage"
          value={roomName}
          onChange={(e) => {
            e.preventDefault();
            setRoomName(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};

export default RoomModal;
