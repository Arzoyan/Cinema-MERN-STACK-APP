import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Input, Select, Form } from "antd";
import { fetchAddMovie, fetchUpdateMovie } from "../../store/movies/Api";
import { selectRooms } from "../../store/room/slice";
import FileUpload, { getBase64 } from "../fileUpload";

import "./styles.css";

const MovieModal = ({ item, open, setOpen }) => {
  const [movieState, setMovieState] = useState({});
  const rooms = useSelector(selectRooms);

  useEffect(() => {
    if (item?.title) {
      setMovieState(item);
    }
  }, [item]);

  const roomOptions = useMemo(() => {
    return rooms.map((item) => {
      return { label: <span>{item.name}</span>, value: item._id };
    });
  }, [rooms]);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    setOpen(false);
    setMovieState("");
  };

  const onValidationForm = () => {
    if (!Object.keys(movieState).length) {
      return false;
    }
    if (!movieState.title.trim()) {
      updateMovieValues("title", "");
      return false;
    }
    if (!movieState.time.trim()) {
      updateMovieValues("time", "");
      return false;
    }
    if (!movieState.roomId) {
      return false;
    }
    return true;
  };

  const onAddNewMovie = async () => {
    if (!onValidationForm()) {
      return false;
    }
    if (!item?.title) {
      if (movieState.image) {
        movieState.image = await getBase64(movieState.image.originFileObj);
      }

      dispatch(fetchAddMovie(movieState));
    } else {
      if (movieState.image?.originFileObj) {
        movieState.image = await getBase64(movieState.image.originFileObj);
      }

      dispatch(fetchUpdateMovie({ id: item._id, body: movieState }));
    }
    onCloseModal();
  };

  const updateMovieValues = (key, value) => {
    setMovieState((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const handleChangeRoom = (value) => {
    updateMovieValues("roomId", value);
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
        <Form variant="filled" style={{ maxWidth: 600 }}>
          <Form.Item
            label="Room"
            name="roomId"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please Select Room!" }]}
          >
            <Select
              value={movieState.roomId}
              style={{ width: "100%" }}
              onChange={handleChangeRoom}
              options={roomOptions || []}
            />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Movie Name is required !" }]}
            validateTrigger="onBlur"
          >
            <Input
              value={movieState.title}
              onChange={(e) => {
                e.preventDefault();
                updateMovieValues("title", e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="time"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Movie time is required !" }]}
          >
            <Input
              value={movieState.time}
              onChange={(e) => {
                e.preventDefault();
                updateMovieValues("time", e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input
              value={movieState.description}
              onChange={(e) => {
                e.preventDefault();
                updateMovieValues("description", e.target.value);
              }}
            />
          </Form.Item>
          <h4>Movie Banner</h4>

          {!movieState?.image || movieState?.image?.originFileObj ? (
            <FileUpload
              fileList={movieState?.image ? [movieState.image] : []}
              setFileList={(image) => updateMovieValues("image", image[0])}
            />
          ) : (
            <div className="image_root">
              <button
                className="image_root_close"
                onClick={() => {
                  updateMovieValues("image", "");
                }}
              >
                X
              </button>
              <img width={150} src={movieState?.image} />
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default MovieModal;
