import React, {useLayoutEffect} from 'react';
import './styles.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4langRu from '@amcharts/amcharts4/lang/ru_RU';
import {Card} from 'antd';

am4core.useTheme(am4themes_animated);

const chartData = [
  {
    region: 'ЦФО',
    value: 23725
  },
  {
    region: 'СЗФО',
    value: 1882
  },
  {
    region: 'ЮФО',
    value: 1809
  },
  {
    region: 'СКФО',
    value: 1322
  },
  {
    region: 'ПФО',
    value: 1122
  },
  {
    region: 'УФО',
    value: 1114
  },
  {
    region: 'СФО',
    value: 984
  },
  {
    region: 'ДФО',
    value: 711
  }
];

const RadarChart = () => {
  useLayoutEffect(() => {
    let chart = am4core.create('radarChart', am4charts.RadarChart);
    chart.language.locale = am4langRu;
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.innerRadius = am4core.percent(50);
    chart.startAngle = -80;
    chart.endAngle = 260;
    chart.data = chartData;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'region';
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.bent = true;
    categoryAxis.renderer.labels.template.padding(0, 0, 0, 0);
    categoryAxis.renderer.labels.template.radius = 7;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 24000;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.grid.template.strokeOpacity = 0.08;
    valueAxis.tooltip.disabled = true;

// axis break
    let axisBreak = valueAxis.axisBreaks.create();
    axisBreak.startValue = 2100;
    axisBreak.endValue = 22900;
    axisBreak.breakSize = 0.02;

// make break expand on hover
    let hoverState = axisBreak.states.create('hover');
    hoverState.properties.breakSize = 1;
    hoverState.properties.opacity = 0.1;
    hoverState.transitionDuration = 1500;

    axisBreak.defaultState.transitionDuration = 1000;

    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.dataFields.categoryX = 'region';
    series.dataFields.valueY = 'value';
    series.columns.template.tooltipText = '{valueY.value}';
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    chart.seriesContainer.zIndex = -1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    let cursor = new am4charts.RadarCursor();
    cursor.innerRadius = am4core.percent(50);
    cursor.lineY.disabled = true;

    cursor.xAxis = categoryAxis;
    chart.cursor = cursor;

    return () => {
      chart.dispose();
    };
  }, [])
  return (
    <Card title="Округа" bordered={false}>
      <div id="radarChart" style={{width: '100%', height: '600px'}} />
    </Card>
  )
}

export default RadarChart
  