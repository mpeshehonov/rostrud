import React from 'react';
import './styles.scss';
import {Row, Col, ConfigProvider, DatePicker} from 'antd';
import StackedAreaChart from './StackedAreaChart';
import TagCloudChart from './TagCloudChart';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import BubbleChart from './BubbleChart';

const { RangePicker } = DatePicker;
const monthFormat = 'MM.YYYY';

const Dashboard = () => {

  return (
    <>
      <ConfigProvider locale={locale}>
        <RangePicker
          picker="month"
          format={monthFormat}
          defaultValue={[moment('01.2020', monthFormat), moment('11.2020', monthFormat)]}
        />
      </ConfigProvider>
      <Row>
        <Col span={12}>
          <StackedAreaChart/>
        </Col>
        <Col span={12}>
          <TagCloudChart/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BubbleChart/>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
