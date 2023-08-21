import React, { useState } from "react";
import Form from "./sub_components/Form";
import Table from "./sub_components/Table";
import { Modal } from "antd";
import { Tooltip } from "antd";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
function Requests() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Tooltip placement="right" title={"Talep Oluştur"}>
        <Fab color="primary" aria-label="add" onClick={showModal}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal
        title="İzin Talebi Oluştur"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={"    "}
      >
        <Form />
      </Modal>
      <Table />
    </div>
  );
}

export default Requests;
