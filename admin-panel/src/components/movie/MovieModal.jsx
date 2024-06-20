import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Input, Select } from "antd";
import { fetchAddMovie, fetchUpdateMovie } from "../../store/movies/Api";
import { selectRooms } from "../../store/room/slice";
import FileUpload from "../fileUpload";

import "./styles.css";
import API_URL from "../../config";

const MovieModal = ({ item, open, setOpen }) => {
  const [roomId, setRoomId] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState();
  const rooms = useSelector(selectRooms);

  useEffect(() => {
    if (item.title) {
      updateMovieValues(item);
    }
  }, [item.title]);

  const onRestState = () => {
    setRoomId("");
    setTitle("");
    setTime("");
    setImage("");
  };

  const roomOptions = useMemo(() => {
    return rooms.map((item) => {
      return { label: <span>{item.name}</span>, value: item._id };
    });
  }, [rooms]);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    setOpen(false);
    // onRestState();
  };

  const onValidationForm = () => {
    if (!title.trim()) {
      return false;
    }
    if (!time.trim()) {
      return false;
    }
    if (!roomId) {
      return false;
    }
    return true;
  };

  const onAddNewMovie = async () => {
    if (!onValidationForm()) {
      return false;
    }
    let data = { roomId, image, time, title };
    if (!item?.title) {
      if (data.image) {
        data.image = data.image.originFileObj;
      }
      dispatch(fetchAddMovie(data));
    } else {
      if (data.image?.originFileObj) {
        data.image = data.image.originFileObj;
      }

      dispatch(fetchUpdateMovie({ id: item._id, body: data }));
    }
    onCloseModal();
  };

  const updateMovieValues = (item) => {
    setRoomId(item.roomId);
    setTitle(item.title);
    setTime(item.time);
    setImage(item.image);
  };

  const handleChangeRoom = (value) => {
    setRoomId(value);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Movie
      </Button>
      <Modal
        title={<p>{item?.title ? "Edit Movei" : "Add Movie"}</p>}
        footer={
          <>
            <Button
              disabled={!onValidationForm()}
              type="primary"
              onClick={(e) => {
                e.preventDefault();
                onAddNewMovie();
              }}
              htmlType="submit"
            >
              Save
            </Button>
            <Button onClick={onCloseModal}>Cancel</Button>
          </>
        }
        open={open}
        onCancel={onCloseModal}
      >
        <>
          <h4>Select Room</h4>
          <Select
            value={roomId}
            style={{ width: "100%" }}
            onChange={handleChangeRoom}
            options={roomOptions || []}
          />
          <h4> Movie Title</h4>
          <Input
            value={title}
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
          />
          <h4> Movie Time</h4>
          <Input
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <h4>Movie Banner</h4>
          {!image || image?.originFileObj ? (
            <FileUpload
              fileList={image ? [image] : []}
              setFileList={(image) => setImage(image[0])}
            />
          ) : (
            <div className="image_root">
              <button
                className="image_root_close"
                onClick={() => {
                  setImage();
                }}
              >
                X
              </button>
              <img width={150} src={`${API_URL}/img/movies/${image}`} />
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default MovieModal;
