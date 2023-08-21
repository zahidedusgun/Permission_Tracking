import React, { useEffect } from "react";
import { Table as AntTable, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface DataType {
  key: string;
  start: string;
  end: number;
  location: string;
  perm_type: string[];
  description: string;
  posting_date: string;
  delete: string;
  edit: string;
}

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

function Table() {
  const [data, setData] = React.useState<DataType[]>([]);

  async function getRequests() {
    try {
      const response = await fetch("http://localhost:8000/date/request");
      const jsonData = await response.json();
      console.log(jsonData);
  
      const transformedData = jsonData.map((data: any) => ({
        key: data.id,
        start: dayjs(data.start_date).format("YYYY-MM-DD"),
        end: dayjs(data.end_date).format("YYYY-MM-DD"),
        location: data.perm_location,
        perm_type: Array.isArray(data.perm_type)
        ? data.perm_type.join(", ") 
        : data.perm_type ? [data.perm_type] : [], 
        posting_date: dayjs(data.posting_date).format("YYYY-MM-DD"),
        delete: "Sil",
        edit: "Düzenle",
      }));
  
      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <AntTable columns={columns} dataSource={data} style={{ marginTop: "50px" }} />
    </>
  );
}


export default Table;
