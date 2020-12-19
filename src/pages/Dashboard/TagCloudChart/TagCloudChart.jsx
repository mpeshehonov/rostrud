import React, {useLayoutEffect, useState, useEffect} from 'react';
import './styles.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4langRu from '@amcharts/amcharts4/lang/ru_RU';
import {Badge, Card, Space} from 'antd';
import axios from 'axios';

am4core.useTheme(am4themes_animated);

const TagCloudChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('/data/cloud.json').then((r) => setChartData(r.data));
  }, [])

  useLayoutEffect(() => {
    const chart = am4core.create('tagCloudChart', am4plugins_wordCloud.WordCloud);
    chart.language.locale = am4langRu;
    chart.data = chartData;

    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.randomness = 0.1;
    series.rotationThreshold = 0.5;
    series.dataFields.word = 'profession';
    series.dataFields.value = 'count';
    series.labels.template.tooltipText = '{word}: {value}';

    series.heatRules.push({
      'target': series.labels.template,
      'property': 'fill',
      'min': am4core.color('#0f0'),
      'max': am4core.color('#f00'),
      'dataField': 'value'
    });

    let hoverState = series.labels.template.states.create('hover');
    hoverState.properties.fill = am4core.color('#c0c');

    return () => {
      chart.dispose();
    };
  }, [chartData])

  return (
    <Card title="Профессии" bordered={false}>
      <div id="tagCloudChart" style={{width: '100%', height: '600px'}} />
      <div className="box-center">
        <Space align="center">
          <Badge color="#0f0" text="Мало увольнений" />
          <Badge color="#f00" text="Много увольнений" />
        </Space>
      </div>
    </Card>
  )
}

export default TagCloudChart
  