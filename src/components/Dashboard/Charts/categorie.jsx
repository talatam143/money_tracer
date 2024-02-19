import React from "react";
import ReactApexChart from "react-apexcharts";

const CategoriesChart = (props) => {
  const { categoryStats } = props;

  const categoriesSeries = [
    {
      data: categoryStats?.map?.((eachMethod) => eachMethod.transactionCount),
    },
  ];

  const categoriesOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: categoryStats?.map?.(
        (eachMethod) => eachMethod._id?.split?.("-")[1]
      ),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    title: {
      text: "Categories",
      align: "left",
      floating: false,
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
    <div
      className="dashboard-chart-pie-container"
      style={{ overflowX: "scroll" }}
    >
      <ReactApexChart
        options={categoriesOptions}
        series={categoriesSeries}
        type="bar"
        height={380}
        width={categoryStats?.length * 35 || 100}
      />
    </div>
  );
};

export default CategoriesChart;
