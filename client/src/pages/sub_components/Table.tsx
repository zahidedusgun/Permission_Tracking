import React, { useEffect, useState } from "react";
import { Table as AntTable, Tag, Button, Popconfirm } from "antd";
import dayjs from "dayjs";
<<<<<<< HEAD
import EditForm from "./EditForm";
import "./general.css";
import { Header } from "antd/es/layout/layout";
=======
>>>>>>> parent of f8e5fff... human resorces, panel has been completed, hr can show the request permission table on home page.

interface TableProps {
  refreshData: boolean;
}

<<<<<<< HEAD
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
  }

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
            <Tag color="blue" key={tag}>
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
        <Tag color="blue">
          {accepting ? accepting : "Bekleniyor..."}
        </Tag>
      ),
    },
  ];
=======
const columns: ColumnsType<DataType> = [
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
    title: "Lokasyon",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "İzin Türü",
    dataIndex: "perm_type",
    key: "type",
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Açıklama",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "İşlem Tarihi",
    dataIndex: "posting_date",
    key: "posting_date",
  },
];
>>>>>>> parent of f8e5fff... human resorces, panel has been completed, hr can show the request permission table on home page.

  const [data, setData] = useState<DataType[]>([]);

  async function getRequests() {
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
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getRequests();
  }, [refreshData]);

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

  return (
    <>
  <div className="label" style={{ color: "navy", fontSize: "20px", marginBottom: "5px", marginTop:"25px" }}>
        Taleplerim
      </div>    <AntTable
      columns={columns}
      dataSource={data}
      style={{ marginTop: "30px" }}
      expandable={{
        expandedRowRender: (record) => (
          <div>
            <div>
              <h3 style={{ color: "navy", fontSize: "14px" }}>Açıklama:</h3>
              <p style={{ margin: 0, fontSize: "12px" }}>{record.description}</p>
              <hr style={{ margin: "5px 0" }} />
              <h3 style={{ color: "navy", fontSize: "14px" }}>Lokasyon:</h3>
              <p style={{ margin: 0, fontSize: "12px" }}>{record.location}</p>
            </div>
            <div className="button-container" style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <Popconfirm
                title="Emin misiniz?"
                onConfirm={() => handleDelete(record.id)}
                okText="Evet"
                cancelText="Hayır"
              >
                <Button type="link" className="delete-button" style={{ marginRight: "10px" }}>
                  İptal Et
                </Button>
              </Popconfirm>
              <EditForm data={record} onDataEdit={getRequests} />
            </div>
          </div>
        ),
        rowExpandable: (record) => {
          return record.description !== "";
        },
      }}
    />
  </>
  );
}

export default Table;
