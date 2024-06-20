// src/components/RoomList.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Card, Spin, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchDeleteMovie, fetchMovies } from "../../store/movies/Api";
import {
  selectMovies,
  selectMoviesError,
  selectMoviesStatus,
} from "../../store/movies/slice";
import MovieModal from "./MovieModal";
import API_URL from "../../config";

const MovieList = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Spin size="large" />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const confirm = (id) => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "are you shure you want to delete this room ?",
      okText: "delete",
      cancelText: "cancel",
      onOk: () => {
        dispatch(fetchDeleteMovie(id));
      },
    });
  };

  return (
    <>
      <MovieModal
        open={open}
        setOpen={(isOpen) => {
          setOpen(isOpen);
          setItem({});
        }}
        item={item}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={movies}
        renderItem={(item) => (
          <List.Item>
            <Card
              cover={
                item.image && (
                  <img alt="example" src={`${API_URL}/${item.image}`} />
                )
              }
              title={item.title}
              actions={[
                <Button
                  type="primary"
                  key="list-edit"
                  onClick={() => {
                    setItem(item);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>,
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    confirm(item._id);
                  }}
                  key="list-more"
                >
                  Delete
                </Button>,
              ]}
            >
              <p> {item.roomName}</p>
              <p>time: {item.time}</p>
            </Card>
          </List.Item>
        )}
      />

      {contextHolder}
    </>
  );
};

export default MovieList;
