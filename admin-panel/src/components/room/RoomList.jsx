import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { List, Spin, Button, Modal } from "antd";
import { fetchDeleteRoom, fetchRooms } from "../../store/room/Api";
import RoomModal from "./RoomModal";
import {
  selectRoomError,
  selectRoomStatus,
  selectRooms,
} from "../../store/room/slice";

const RoomList = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const status = useSelector(selectRoomStatus);
  const error = useSelector(selectRoomError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
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
        dispatch(fetchDeleteRoom(id));
      },
    });
  };

  return (
    <>
      <RoomModal
        open={open}
        setOpen={(isOpen) => {
          setOpen(isOpen);
          setItem({});
        }}
        item={item}
      />
      <List
        dataSource={rooms}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            actions={[
              <Button
                onClick={() => {
                  setItem(item);
                  setOpen(true);
                }}
                key="list-edit"
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
            <List.Item.Meta title={<h3>{item.name}</h3>} />
          </List.Item>
        )}
      />
      {contextHolder}
    </>
  );
};

export default RoomList;
