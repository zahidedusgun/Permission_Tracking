import React from "react";
import { Row, Col } from "antd";
import Card from "antd/es/card/Card";
import Divider from "antd/es/divider";

function Profile() {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
        <Card title="İzin Gün Sayısı" bordered={false} className="custom-card">
      <div className="day-number">
        <span className="effect">14</span>
        <div className="day-text">Gün</div>
      </div>
      <Divider type="vertical" className="vertical-line" />
      <p className="total-days">Kullanılan Günler: 10</p>
      <p className="total-days">Toplam Gün: 30</p>
    </Card>
        </Col>
        <Col span={16}>
          <Card title="İzin Türleri" bordered={false}>
            Kabul edilen izin türler burada görünecek..
          </Card>
        </Col>
   
      </Row>
    </>
  );
}

export default Profile;
