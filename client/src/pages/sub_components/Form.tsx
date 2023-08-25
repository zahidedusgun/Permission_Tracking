import React, { useState } from "react";
import { Button, DatePicker, Space, Select, Input } from "antd";
import { DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "@mui/material";
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

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
   
      const selectedDate = dayjs(date);
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  };
  const onOk = (value: DatePickerProps['value'] | DatePickerProps['value']) => {
    console.log('onOk: ', value);
  };
  const onChange = (value: string) => {
    setType(value);
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
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newId = uuidv4();

      const body = {
        id: newId,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        perm_location: location,
        perm_type: type,
        description: description,
        posting_date: dayjs().toISOString(),
      };
      const response = await fetch("http://localhost:8000/date/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Kayıt başarıyla eklendi.");
        alert ("Kayıt başarıyla eklendi.");

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

  return (
    <div>
      <form onSubmit={onSubmit}>
               <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "450px",
            height: "450px",
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
              <DatePicker placeholder="Başlangıç" onChange={onChangeDate} onOk={onOk} />
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
                  value: "Günlük izin",
                  label: "Günlük izin",
                },
              ]}
            />
          </div>
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