import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactEChartsWrapper from "../../../utils/apache_chart_wrapper";

const PaymentMethodChart = () => {
  const paymentMethodStats = useSelector(
    (state) => state.dashboard.charts?.paymentMethodStats
  );
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    let formattedData = [];
    let total = paymentMethodStats.reduce((acc, curr) => {
      return acc + curr.transactionCount;
    }, 0);
    paymentMethodStats.forEach((eachData) => {
      formattedData.push({
        name: eachData._id,
        value: eachData.transactionCount,
        percent: ((eachData.transactionCount / total) * 100).toFixed(2),
      });
    });
    setChartData(formattedData);
    setChartLoading(false);
  }, [paymentMethodStats]);

  return (
    <div className="charts-payment-method-container">
      <ReactEChartsWrapper
        option={{
          tooltip: {
            trigger: "item",
          },
          color: ["#cadc53", "#dd6745", "#7b9fff", "#32c960", "#ae9eeb"],
          legend: {
            show: true,
            top: "center",
            left: "2%",
            orient: "vertical",
            formatter: function (name) {
              return `${name} - ${chartData
                .filter((a) => a.name === name)
                .map((a) => a.percent)}%`;
            },
            textStyle: {
              color: "#838288",
              fontSize: 14,
              lineHeight: 20,
            },
          },
          title: [
            {
              text: "Payment method analysis",
              padding: 15,
              textStyle: { fontSize: 20 },
            },
          ],
          series: [
            {
              type: "pie",
              radius: ["45%", "70%"],
              avoidLabelOverlap: false,
              padAngle: 1,
              itemStyle: {
                borderRadius: 8,
              },
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              right: "-40%",
              data: chartData,
            },
          ],
        }}
        style={{
          height: "250px",
          width: "100%",
        }}
        loading={chartLoading}
      />
    </div>
  );
};

export default PaymentMethodChart;
