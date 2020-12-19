import React, {useLayoutEffect, useState, useEffect} from 'react';
import './styles.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4langRu from '@amcharts/amcharts4/lang/ru_RU';
import {Card} from 'antd';
import axios from 'axios';

am4core.useTheme(am4themes_animated);

const StackedAreaChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('/data/work_by_date.json').then((r) => setChartData(r.data));
  }, [])

  useLayoutEffect(() => {
    const chart = am4core.create('stackedAreaChart', am4charts.XYChart);
    chart.language.locale = am4langRu;
    chart.data = chartData;

    chart.dateFormatter.inputDateFormat = 'mm.yyyy';
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.startLocation = 0;
    dateAxis.endLocation = 1;
    dateAxis.baseInterval = {
      timeUnit: 'month',
      count: 1
    };

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.name = 'Занятые';
    series.dataFields.valueY = 'work';
    series.tooltipText = '[#000]{valueY.value}[/]';
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.getFillFromObject = true;
    series.tooltip.background.strokeWidth = 3;
    series.fillOpacity = 0.6;
    series.strokeWidth = 2;
    series.stacked = true;

    const series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = 'Пособие';
    series2.dataFields.dateX = 'date';
    series2.dataFields.valueY = 'not_work';
    series2.tooltipText = '[#000]{valueY.value}[/]';
    series2.tooltip.getFillFromObject = true;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.background.strokeWidth = 3;
    series2.sequencedInterpolation = true;
    series2.fillOpacity = 0.6;
    series2.stacked = true;
    series2.strokeWidth = 2;

    const series3 = chart.series.push(new am4charts.LineSeries());
    series3.name = 'Незанятые';
    series3.dataFields.dateX = 'date';
    series3.dataFields.valueY = 'no_info';
    series3.tooltipText = '[#000]{valueY.value}[/]';
    series3.tooltip.getFillFromObject = true;
    series3.tooltip.getStrokeFromObject = true;
    series3.tooltip.background.strokeWidth = 3;
    series3.sequencedInterpolation = true;
    series3.fillOpacity = 0.6;
    series3.defaultState.transitionDuration = 1000;
    series3.stacked = true;
    series3.strokeWidth = 2;

    const range = dateAxis.axisRanges.create();
    range.date = new Date(2019, 0, 1);
    range.endDate = new Date(2020, 12, 31);
    range.axisFill.fill = chart.colors.getIndex(7);
    range.axisFill.fillOpacity = 0.2;

    range.label.text = 'Наибольшие потери';
    range.label.inside = true;
    range.label.rotation = 90;
    range.label.horizontalCenter = 'right';
    range.label.verticalCenter = 'bottom';

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';

    return () => {
      chart.dispose();
    };
  }, [chartData])

  return (
    <Card title="Пособия" bordered={false}>
      <div id="stackedAreaChart" style={{width: '100%', height: '600px'}} />
    </Card>
  )
}

export default StackedAreaChart
  