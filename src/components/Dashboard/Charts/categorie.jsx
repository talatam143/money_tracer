import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactEChartsWrapper from "../../../utils/apache_chart_wrapper";
import * as echarts from "echarts";

const CategoriesChart = () => {
  const categoryStats = useSelector(
    (state) => state.dashboard.charts.categoryStats
  );
  const [chartData, setChartData] = useState({ dataAxis: [], data: [] });
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    let data = { dataAxis: [], data: [] };
    categoryStats.forEach((eachCategory) => {
      data.dataAxis.push(eachCategory._id);
      data.data.push(eachCategory.transactionCount);
    });
    setChartData(data);
    setChartLoading(false);
  }, [categoryStats]);

  return (
    <div className="charts-bank-container">
      <ReactEChartsWrapper
        option={{
          title: [
            {
              text: "Categories analysis",
              padding: 15,
              textStyle: { fontSize: 20 },
            },
          ],
          xAxis: {
            data: chartData.dataAxis,
            axisLabel: {
              inside: true,
              color: "#000000",
              rotate: 90,
            },
            textStyle: {
              fontWeight: "bold",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            z: 10,
          },
          yAxis: {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#000000",
            },
          },
          dataZoom: [
            {
              type: "inside",
              start: 30,
              end: 60,
            },
          ],
          series: [
            {
              type: "bar",
              showBackground: true,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#c7bcf7" },
                  { offset: 0.5, color: "#ae9eeb" },
                  { offset: 1, color: "#ae9eeb" },
                ]),
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#ae9eeb" },
                    { offset: 0.7, color: "#ae9eeb" },
                    { offset: 1, color: "#c7bcf7" },
                  ]),
                },
              },
              data: chartData.data,
            },
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
        }}
        style={{ height: "500px" }}
        loading={chartLoading}
      />
    </div>
  );
};

export default CategoriesChart;
