import React, {useLayoutEffect, useState, useEffect} from 'react';
import './styles.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4langRu from '@amcharts/amcharts4/lang/ru_RU';
import {Card} from 'antd';
import axios from 'axios';

am4core.useTheme(am4themes_animated);


const BubbleChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('/data/baloons.json').then((r) => setChartData(r.data));
  }, [])

  useLayoutEffect(() => {
    let chart = am4core.create('bubbleChart', am4charts.XYChart);
    chart.language.locale = am4langRu;
    chart.data = chartData;

    let title = chart.titles.create();
    title.text = '[bold font-size: 20]Зависимости[/]';
    title.textAlign = 'middle';

    let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.renderer.ticks.template.disabled = true;
    valueAxisX.renderer.axisFills.template.disabled = true;

    let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.renderer.ticks.template.disabled = true;
    valueAxisY.renderer.axisFills.template.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = 'x';
    series.dataFields.valueY = 'y';
    series.dataFields.value = 'value';
    series.strokeOpacity = 0;
    series.sequencedInterpolation = true;
    series.tooltip.pointerOrientation = 'vertical';

    let bullet = series.bullets.push(new am4core.Circle());
    bullet.fill = am4core.color('#ff0000');
    bullet.propertyFields.fill = 'color';
    bullet.strokeOpacity = 0;
    bullet.strokeWidth = 2;
    bullet.fillOpacity = 0.5;
    bullet.stroke = am4core.color('#ffffff');
    bullet.hiddenState.properties.opacity = 0;
    bullet.tooltipText = '[bold]{title}:[/]\nЗначение: {value.value}\nМесяц: {valueX.value}\nГод рождения: {valueY.value}';

    let outline = chart.plotContainer.createChild(am4core.Circle);
    outline.fillOpacity = 0;
    outline.strokeOpacity = 0.8;
    outline.stroke = am4core.color('#ff0000');
    outline.strokeWidth = 2;
    outline.hide(0);

    let blurFilter = new am4core.BlurFilter();
    outline.filters.push(blurFilter);

    bullet.events.on('over', function (event) {
      let target = event.target;
      outline.radius = target.pixelRadius + 2;
      outline.x = target.pixelX;
      outline.y = target.pixelY;
      outline.show();
    })

    bullet.events.on('out', function (event) {
      outline.hide();
    })

    let hoverState = bullet.states.create('hover');
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.strokeOpacity = 1;

    series.heatRules.push({target: bullet, min: 2, max: 60, property: 'radius'});

    bullet.adapter.add('tooltipY', function (tooltipY, target) {
      return -target.radius;
    })

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'zoomXY';
    chart.cursor.snapToSeries = series;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    return () => {
      chart.dispose();
    };
  }, [chartData])

  return (
    <Card bordered={false}>
      <div id="bubbleChart" style={{width: '100%', height: '600px'}} />
    </Card>
  )
}

export default BubbleChart
  