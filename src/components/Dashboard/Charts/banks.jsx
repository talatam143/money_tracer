import React from "react";
import ReactApexChart from "react-apexcharts";

const BankChart = (props) => {
  const { bankStats } = props;

  const bankSeries = [
    {
      data: bankStats?.map?.((eachMethod) => eachMethod.transactionCount) || [],
    },
  ];
  const bankOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: bankStats?.map?.((eachMethod) => eachMethod._id)||[],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: "Banks",
      align: "center",
      floating: true,
      style: {
        fontSize: "20px",
        fontWeight: "600",
        fontFamily: "Open Sans",
        color: "#000000",
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function (e) {
            return "Count -";
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-chart-pie-container">
      <ReactApexChart
        options={bankOptions}
        series={bankSeries}
        type="bar"
        height={bankStats?.length * 35 || 100}
      />
    </div>
  );
};

export default BankChart;
