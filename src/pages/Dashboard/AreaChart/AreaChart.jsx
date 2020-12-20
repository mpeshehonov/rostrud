import React, {useLayoutEffect, useState, useEffect} from 'react';
import './styles.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4langRu from '@amcharts/amcharts4/lang/ru_RU';
import {Card} from 'antd';
import axios from 'axios';

am4core.useTheme(am4themes_animated);

const AreaChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('/data/unemploy_by_date.json').then((r) => setChartData(r.data));
  }, [])

  useLayoutEffect(() => {
    let chart = am4core.create('areaChart', am4charts.XYChart);
    chart.language.locale = am4langRu;
    chart.paddingRight = 20;
    chart.data = chartData;
    chart.dateFormatter.inputDateFormat = 'MM.YYYY';

    let title = chart.titles.create();
    title.text = '[bold font-size: 20]Динамика увольнений[/]';
    title.textAlign = 'middle';

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'count';
    series.strokeWidth = 2;
    series.fillOpacity = 0.5;

    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.marginLeft = 0;

    chart.cursor = new am4charts.XYCursor();
  }, [chartData])

  return (
    <Card bordered={false}>
      <div id="areaChart" style={{width: '100%', height: '600px'}} />
    </Card>
  )
}

export default AreaChart
  