import React, { useEffect, useState } from "react";
import { Table as AntTable, Tag } from "antd";
import "../../../pages/sub_components/general.css";

interface TableProps {
  refreshData: boolean;
}

function HMTable({ refreshData }: TableProps) {
  interface DataType {
    id: any;
    key: string;
    username: string;
    password: string;
    role: string[];
  }

  const permissionTypeColors: Record<string, string> = {
    "admin": "red",
    "leader": "lime",
    "employee": "purple",
  };

  const columns = [
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
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
      title: "Şifre",
      dataIndex: "password",
      key: "password",
    },
  ];

  const [data, setData] = useState<DataType[]>([]);

  async function getRequests() {
    try {
      const response = await fetch("http://localhost:8000/auth/register");
      const jsonData = await response.json();

      const transformedData = jsonData.map((data: any) => ({
        id: data.id,
        key: data.id,
        username: data.username,
        password: data.password,
        role: Array.isArray(data.role)
          ? data.role.join(", ")
          : data.role
          ? [data.role]
          : [],
      }));
      setData(transformedData);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  }

  useEffect(() => {
    getRequests();
  }, [refreshData]);

  return (
    <div>
      <div
        className="label"
        style={{
          color: "navy",
          fontSize: "20px",
          marginBottom: "5px",
          marginTop: "25px",
        }}
      >
        ISSD Çalışan Listesi
      </div>
      <AntTable
        columns={columns}
        dataSource={data}
        style={{ marginTop: "30px" }}
      />
    </div>
  );
}

export default HMTable;