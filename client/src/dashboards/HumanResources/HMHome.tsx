import React, { useEffect, useState } from "react";
import { Table as AntTable, Tag, Popconfirm } from "antd";
import dayjs from "dayjs";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box } from "@mui/material";
function HMHome() {
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
          {tags.map((tag, index) => (
            <Tag color="blue" key={index}>
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
      title: "Kabul",
      dataIndex: "accepting",
      key: "accepting",
      render: (accepting: string) => (
        <Popconfirm
          title="Kabul etmek için emin misiniz?"
          // onConfirm={() => handleDelete(record.id)}
          okText="Evet"
          cancelText="Hayır"
        >
          <TaskAltIcon style={{ color: "green" }} />
        </Popconfirm>
      ),
    },
    {
      title: "Ret",
      dataIndex: "rejection",
      key: "rejection",
      render: (rejection: string) => (
        <Popconfirm
          title="Reddetmek için emin misiniz?"
          // onConfirm={() => handleDelete(record.id)}
          okText="Evet"
          cancelText="Hayır"
        >
          <CancelOutlinedIcon style={{ color: "red" }} />
        </Popconfirm>
      ),
    },
  ];

  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    try {
      const response = await fetch("http://localhost:8000/date/request", {
        method: "GET",
      });
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
        accepting: data.accepting, // assuming you have an 'accepting' field in your data
        rejection: data.rejection, // assuming you have a 'rejection' field in your data
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //iptal kısmını buraya taşı!!!
  //   async function handleDelete(id: string) {
  //     try {
  //       const response = await fetch(`http://localhost:8000/date/request/${id}`, {
  //         method: "DELETE",
  //       });

  //       if (response.ok) {
  //         console.log("Kayıt başarıyla silindi.");
  //         getRequests();
  //       } else {
  //         console.log("Kayıt silinirken bir hata oluştu.");
  //       }
  //     } catch (err) {
  //       console.error((err as Error).message);
  //       console.log("Kayıt silinirken bir hata oluştu.");
  //     }
  //   }

  return (
    <>
      <div
        className="label"
        style={{
          color: "navy",
          fontSize: "20px",
          marginBottom: "2px",
          marginTop: "85px",
        }}
      >
        Genel İzin Talepleri
      </div>

      <AntTable
        columns={columns}
        dataSource={data}
        style={{ marginTop: "50px" }}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <div>
                <h3 style={{ color: "navy", fontSize: "14px" }}>Açıklama:</h3>
                <p style={{ margin: 0, fontSize: "12px" }}>
                  {record.description}
                </p>
                <hr style={{ margin: "5px 0" }} />
                <h3 style={{ color: "navy", fontSize: "14px" }}>Lokasyon:</h3>
                <p style={{ margin: 0, fontSize: "12px" }}>{record.location}</p>
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

export default HMHome;
