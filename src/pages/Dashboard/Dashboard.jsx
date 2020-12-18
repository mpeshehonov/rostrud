import React from 'react';
import './styles.scss';
import {Row, Col} from 'antd';
import StackedAreaChart from './StackedAreaChart';


const Dashboard = () => {

  return (
    <>
      <Row>
        <Col span={24}>
          <StackedAreaChart/>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
