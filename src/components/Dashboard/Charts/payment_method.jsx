import React from "react";
import Text from "../../elements/text";
import ReactApexChart from "react-apexcharts";

const PaymentMethodChart = (props) => {
  const { paymentMethodStats } = props;

  const paymentMethodOptions = {
    dataLabels: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    labels: paymentMethodStats?.map?.((eachMethod) => eachMethod._id),
    legend: {
      show: true,
      fontSize: "14px",
      fontWeight: 500,
      position: "bottom",
      horizontalAlign: "center",
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      formatter: function (seriesName, opts) {
        return [
          ` ${seriesName}`,
          " - ",
          opts.w.globals.series[opts.seriesIndex],
        ];
      },
    },
    chart: {
      height: 300,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      dropShadow: {
        enabled: true,
        color: "red",
        top: 1,
        left: 1,
        blur: 0.1,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -25,
        tools: {
          download: true,
        },
        export: {
          csv: {
            filename: "Payment_methods",
            columnDelimiter: ",",
            headerCategory: "Payment Method",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: "Payment_methods",
          },
          png: {
            filename: "Payment_methods",
          },
        },
        autoSelected: "zoom",
      },
    },
  };
  return (
    <div className="dashboard-chart-pie-container">
      <Text
        content="Payment methods"
        m="5px 0 0 5px"
        color="#000000"
        size="20px"
        weight="600"
        width="100%"
        align="center"
      />

      <ReactApexChart
        options={paymentMethodOptions}
        series={paymentMethodStats?.map?.(
          (eachMethod) => eachMethod.transactionCount
        )}
        type="pie"
      />
    </div>
  );
};

export default PaymentMethodChart;
