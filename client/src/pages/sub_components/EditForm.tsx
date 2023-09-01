import React, { useState } from "react";
import { Button, DatePicker, Space, Select, Input, Modal } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { TextArea } = Input;

interface EditFormProps {
  data: any;
  onDataEdit: () => void;
}

function EditForm({ data, onDataEdit }: EditFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(data.start_date));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(data.end_date));
  const [location, setLocation] = useState<string>(data.perm_location);
  const [type, setType] = useState<string>(data.perm_type);
  const [description, setDescription] = useState<string>(data.description);

  const onChangeDate = (date: any, dateString: string) => {
    if (date) {
      const selectedDate = dayjs(date);
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  };

  const onChange = (value: string) => {
    setType(value);
  };

  const handleEdit = async () => {
    try {
      const body = {
        id: data.id,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        perm_location: location,
        perm_type: type,
        description: description,
        posting_date: dayjs().toISOString(),
      };

      const response = await fetch(`http://localhost:8000/date/request/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Kayıt başarıyla düzenlendi.");
        onDataEdit();

        setIsModalOpen(false);
      } else {
        console.log("Kayıt düzenlenirken bir hata oluştu.");
      }
    } catch (err) {
      console.error((err as Error).message);
      console.log("Kayıt düzenlenirken bir hata oluştu.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Değiştir</Button>
      <Modal
        title="Düzenleniyor.."
        visible={isModalOpen}
        onOk={handleEdit}
        onCancel={handleCancel}
      >
        <form>
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
                <DatePicker placeholder="Başlangıç" onChange={onChangeDate} value={startDate}/>
                <DatePicker placeholder="Bitiş" onChange={onChangeDate} value={endDate}/>
              </Space>
            </div>
            <div className="location"  >
              <div style={{ marginBottom: "5px", color: "navy" }} >
                {"Lokasyon Seçiniz:"}
              </div>
              <Input
                placeholder="Lokasyon"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: "40ch" }}              />
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
                value={type}
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
          
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditForm;