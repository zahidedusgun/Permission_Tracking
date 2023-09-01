import React, { useEffect, useState } from "react";
import { Table as AntTable, Tag, Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import EditForm from "./EditForm";
import "./general.css";

interface TableProps {
  refreshData: boolean;
}

function Table({ refreshData }: TableProps) {
  interface DataType {
    id: any;
    key: string;
    start: string;
    end: string;
    location: string;
    perm_type: string[];
    description: string;
    posting_date: string;
    startTime?: string;
    endTime?: string;
  }
  const permissionTypeColors: Record<string, string> = {
    "Saatlik izin": "red",
    "Yıllık izin": "orange",
    "Ücretsiz izin": "purple",
    "Evlilik izni": "magenta",
    "Doğum izni": "pink",
    "Raporlu izin": "lime",
  };
  const columns = [
    {
      title: "Başlangıç Tarihi",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "Bitiş Tarihi",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "İzin Türü",
      dataIndex: "perm_type",
      key: "type",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color={permissionTypeColors[tag]} key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "posting_date",
      key: "posting_date",
    },
    {
      title: "Onay Durumu",
      dataIndex: "accepting",
      key: "accepting",
      render: (accepting: string) => (
        <Tag color="blue">{accepting ? accepting : "Bekleniyor..."}</Tag>
      ),
    },
  ];

  const expandedRowRender = (record: DataType) => (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        borderLeft: "10px solid navy",
        marginLeft: "10px",
      }}
    >
      <div>
        <div>
          <h3 style={{ color: "navy", fontSize: "14px" }}>Açıklama:</h3>
          <p style={{ margin: 0, fontSize: "12px" }}>{record.description}</p>
        </div>
      </div>
      <div>
        <div>
          <h3 style={{ color: "navy", fontSize: "14px" }}>Lokasyon:</h3>
          <p style={{ margin: 0, fontSize: "12px" }}>{record.location}</p>
        </div>
        {record.endTime && (
          <div>
            <h3 style={{ color: "navy", fontSize: "14px" }}>Bitiş Saati:</h3>
            <p style={{ margin: 0, fontSize: "12px" }}>
              {dayjs(record.endTime).format("HH:mm")}
            </p>
          </div>
        )}
        {record.startTime && record.endTime && (
          <div>
            <h3 style={{ color: "navy", fontSize: "14px" }}>Saatlik İzin:</h3>
            <p style={{ margin: 0, fontSize: "12px" }}>
              {dayjs(record.startTime).format("HH:mm")} -{" "}
              {dayjs(record.endTime).format("HH:mm")}
            </p>
          </div>
        )}
      </div>
      <div
        className="button-container"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Popconfirm
          title="Emin misiniz?"
          onConfirm={() => handleDelete(record.id)}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button
            type="link"
            className="delete-button"
            style={{ marginRight: "10px" }}
          >
            İptal Et
          </Button>
        </Popconfirm>
        <EditForm data={record} onDataEdit={getRequests} />
      </div>
    </div>
  );
  

  const [data, setData] = useState<DataType[]>([]);

  async function 
  getRequests() {
    try {
      const response = await fetch("http://localhost:8000/date/request");
      const jsonData = await response.json();

      const transformedData = jsonData.map((data: any) => ({
        id: data.id,
        key: data.id,
        start: dayjs(data.start_date).format("YYYY-MM-DD"),
        end: dayjs(data.end_date).format("YYYY-MM-DD"),
        location: data.perm_location,
        perm_type: Array.isArray(data.perm_type)
          ? data.perm_type.join(", ")
          : data.perm_type
          ? [data.perm_type]
          : [],
        posting_date: dayjs(data.posting_date).format("YYYY-MM-DD"),
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
      }));
      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`http://localhost:8000/date/request/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Kayıt başarıyla silindi.");
        getRequests();
      } else {
        console.log("Kayıt silinirken bir hata oluştu.");
      }
    } catch (err) {
      console.error((err as Error).message);
      console.log("Kayıt silinirken bir hata oluştu.");
    }
  }

  useEffect(() => {
    getRequests();
  }, [refreshData]);

  return (
    <>
      <div
        className="label"
        style={{
          color: "navy",
          fontSize: "20px",
          marginBottom: "5px",
          marginTop: "25px",
        }}
      >
        Taleplerim
      </div>{" "}
      <AntTable
        columns={columns}
        dataSource={data}
        style={{ marginTop: "30px" }}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => {
            return record.description !== "";
          },
        }}
      />
    </>
  );
}

export default Table;
