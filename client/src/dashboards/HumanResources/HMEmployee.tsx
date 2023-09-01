import React, { useState } from "react";
import { Modal } from "antd";
import { Tooltip } from "antd";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import HMForm from "./HMsub_components/HMForm";
import EmployeeTable from "./HMsub_components/EmployeeTable";

function HMEmployee() {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDataSubmit = () => {
    setIsModalVisible(false);
    setRefreshData(!refreshData); 
  };
  return (
    <div>
      <Tooltip placement="right" title={"Kayıt Ekle"}>
        <Fab color="primary"  style={{marginTop:"50px"}}aria-label="add" onClick={showModal}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal
        title="Yeni Çalışan Ekle"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={"    "}
      >
        <HMForm onDataSubmit={handleDataSubmit} />
      </Modal>
      <EmployeeTable refreshData={refreshData} />
    </div>
  );
}

export default HMEmployee;
