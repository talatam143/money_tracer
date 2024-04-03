import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactEChartsWrapper from "../../../utils/apache_chart_wrapper";

const BankChart = () => {
  const bankStats = useSelector((state) => state.dashboard.charts?.bankStats);
  const [chartData, setChartData] = useState({ xAxis: [], yAxis: [] });
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    let data = { xAxis: [], yAxis: [] };
    bankStats.forEach((eachBank) => {
      data.xAxis.push(eachBank._id);
      data.yAxis.push(eachBank.transactionCount);
    });
    setChartData(data);
    setChartLoading(false);
  }, [bankStats]);

  return (
    <div className="charts-bank-container">
      <ReactEChartsWrapper
        option={{
          title: [
            {
              text: "Bank usage analysis",
              padding: 15,
              textStyle: { fontSize: 20 },
            },
          ],
          colorBy: "yAxis",
          color: ["#cadc53", "#ae9eeb", "#dd6745", "#32c960", "#7b9fff"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: function (params) {
              return (
                params[0].name + "<br/>" + params[0].value + " transactions"
              );
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: chartData.xAxis,
          },
          series: [
            {
              type: "bar",
              data: chartData.yAxis,
              barWidth: 35,
            },
          ],
        }}
        style={{
          width: "100%",
          height: `${bankStats?.length * 100}px`,
        }}
        loading={chartLoading}
      />
    </div>
  );
};

export default BankChart;
