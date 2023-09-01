import React, { useState } from "react";
import { Button, DatePicker, Space, Select, Input, TimePicker } from "antd";
import { DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Alert from "antd/es/alert/Alert";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const { TextArea } = Input;

interface FormProps {
  onDataSubmit: () => void;
}

function Form({ onDataSubmit }: FormProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      const selectedDate = dayjs(date);
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  };

  const onChange = (value: string) => {
    setType(value);
    setSelectedType(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setLocation("");
    setType("");
    setDescription("");
    setStartTime(null);
    setEndTime(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      resetAlert();

      if (!startDate || !endDate || !location || !type || !description) {
        setAlertMessage("Tüm alanları doldurunuz!");
        setAlertVisible(true);
        return;
      }
      const newId = uuidv4();

      const body = {
        id: newId,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        perm_location: location,
        perm_type: type,
        description: description,
        startTime: startTime?.toISOString(),
        endTime: endTime?.toISOString(),
        posting_date: dayjs().toISOString(),
      };
      const response = await fetch("http://localhost:8000/date/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

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
          <div className="dates">
            <div style={{ marginBottom: "5px", color: "navy" }}>
              {"Tarih Aralığını Seçiniz:"}
            </div>
            <Space direction="horizontal" size={12}>
              <DatePicker placeholder="Başlangıç" onChange={onChangeDate} />
              <DatePicker placeholder="Bitiş" onChange={onChangeDate} />
            </Space>
          </div>
          <div className="location">
            <div style={{ marginBottom: "5px", color: "navy" }}>
              {"Lokasyon Seçiniz:"}
            </div>
            <Input
              placeholder="Lokasyon"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: "40ch" }}
            />
          </div>

          <div className="type-perm">
            <div style={{ marginBottom: "5px", color: "navy" }}>
              {"İzin Türünü Seçiniz: "}
            </div>
            <Select
              showSearch
              placeholder="İzin Türünü Seçiniz"
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
                  value: "Yıllık izin",
                  label: "Yıllık izin",
                },
                {
                  value: "Raporlu izin",
                  label: "Raporlu izin",
                },
                {
                  value: "Ücretsiz izin",
                  label: "Ücretsiz izin",
                },
                {
                  value: "Doğum izni",
                  label: "Doğum izni",
                },
                {
                  value: "Evlilik izni",
                  label: "Evlilik izni",
                },
                {
                  value: "Saatlik izin",
                  label: "Saatlik izin",
                },
              ]}
            />
          </div>
          {selectedType === "Saatlik izin" && (
            <div className="time">
              <div style={{ marginBottom: "5px", color: "navy", gap: "20px" }}>
                {"Saat Seçiniz:"}
              </div>
              <TimePicker
                placeholder="Başlama Saati"
                onChange={(time) => setStartTime(time)}
                style={{ width: "20ch", marginRight: "12px" }}
              />
              <TimePicker
                placeholder="Bitiş Saati"
                onChange={(time) => setEndTime(time)}
                style={{ width: "20ch" }}
              />
            </div>
          )}
          <div className="description">
            <div style={{ marginBottom: "5px", color: "navy" }}>
              {"Açıklama:"}
            </div>
            <TextArea
              rows={4}
              placeholder="En fazla 100 karakter giriniz."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              style={{ width: "40ch" }}
            />
          </div>

          <Button type="primary" style={{ width: "40ch" }} onClick={onSubmit}>
            {"Gönder"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
