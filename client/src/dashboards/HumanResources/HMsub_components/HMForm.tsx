import React, { useState } from "react";
import { Button, Select, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import Alert from "antd/es/alert/Alert";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

interface FormProps {
  onDataSubmit: () => void;
}

function HMForm({ onDataSubmit }: FormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const onChange = (value: string) => {
    setRole(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRole("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      resetAlert();

      if (!username || !password || !role) {
        setAlertMessage("Tüm alanları doldurunuz!");
        setAlertVisible(true);
        return;
      }
      const newId = uuidv4();

      const body = {
        id: newId,
        username: username,
        password: password,
        role: role,
      };
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      console.log(parseRes);

      if (response.ok) {
        setSuccessMessage("Kayıt başarıyla eklendi.");
        setSuccessVisible(true);

        console.log("Kayıt başarıyla eklendi.");
        alert("Kayıt başarıyla eklendi.");

        onDataSubmit();
        resetForm();
      } else {
        console.log("Kayıt eklenirken bir hata oluştu.");
      }
    } catch (err) {
      console.error((err as Error).message);
      console.log("Kayıt eklenirken bir hata oluştu.");
      console.error((err as Error).message);
    }
  };
  const resetAlert = () => {
    setAlertVisible(false);
    setAlertMessage("");
  };
  const resetSuccess = () => {
    setSuccessVisible(false);
    setSuccessMessage("");
  };
  return (
    <div>
      {alertVisible && (
        <Alert
          message={alertMessage}
          type="error"
          showIcon
          closable
          onClose={resetAlert}
          style={{ marginBottom: "16px" }}
        />
      )}
      <Snackbar
        open={successVisible}
        autoHideDuration={6000}
        onClose={resetSuccess}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={resetSuccess}
          severity="success"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "40px",
            marginLeft: "20px",
            marginTop: "40px",
          }}
        >
          <div className="username">
            <div style={{ marginBottom: "5px", color: "navy" }}>
              {"Kullanıcı Adını Giriniz:"}
            </div>
            <Input
              placeholder="Kulanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "40ch" }}
            />
          </div>
          <div className="password">
            <div style={{ marginBottom: "5px", color: "navy" }}>
              {"Şifre Giriniz:"}
            </div>
            <Input
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "40ch" }}
            />
          </div>
          <div className="type-perm">
            <div style={{ marginBottom: "5px", color: "navy" }}>
              {"Çalışan departmanını seçiniz."}
            </div>
            <Select
              showSearch
              placeholder="Çalışan departmanını seçiniz."
              optionFilterProp="children"
              style={{ width: "40ch" }}
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "admin",
                  label: "admin",
                },
                {
                  value: "leader",
                  label: "leader",
                },
                {
                  value: "employee",
                  label: "employee",
                },
              ]}
            />
          </div>
          <Button type="primary" style={{ width: "40ch" }} onClick={onSubmit}>
            {"Ekle"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HMForm;
