import React, {useLayoutEffect, useState, useEffect} from 'react';
import './styles.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4langRu from '@amcharts/amcharts4/lang/ru_RU';
import {Card} from 'antd';
import axios from 'axios';

am4core.useTheme(am4themes_animated);

const TreeMapChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('/data/districts.json').then((r) => setChartData(r.data));
  }, [])

  useLayoutEffect(() => {
    let chart = am4core.create('treeMapChart', am4plugins_forceDirected.ForceDirectedTree);
    chart.language.locale = am4langRu;

    let title = chart.titles.create();
    title.text = '[bold font-size: 20]Округа детально[/]';
    title.textAlign = 'middle';

    let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

    networkSeries.data = chartData;

    networkSeries.dataFields.linkWith = 'linkWith';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.id = 'name';
    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.children = 'children';

    networkSeries.nodes.template.tooltipText = '{name}';
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = '{name}'
    networkSeries.fontSize = 8;
    networkSeries.maxLevels = 2;
    networkSeries.maxRadius = am4core.percent(10);
    networkSeries.manyBodyStrength = -16;
    networkSeries.nodes.template.label.truncate = true;

    return () => {
      chart.dispose();
    };
  }, [chartData]);
  return (
    <Card bordered={false}>
      <div id="treeMapChart" style={{width: '100%', height: '600px'}} />
    </Card>
  )
}

export default TreeMapChart
  