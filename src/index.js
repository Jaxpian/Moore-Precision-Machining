import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
import echarts from "echarts";
import cubejs from "@cubejs-client/core";

// initialize cubejs instance with API Token and API URL
const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.K9PiJkjegbhnw4Ca5pPlkTmZihoOm42w8bja9Qs2qJg",
  { apiUrl: "https://react-query-builder.herokuapp.com/cubejs-api/v1" }
);

// Load query for orders by created month in 2017 year
cubejsApi
  .load({
    measures: ["Orders.count"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        dateRange: ["2017-01-01", "2017-12-31"],
        granularity: "month"
      }
    ]
  })
  .then(resultSet => {
    // initialize echarts instance with prepared DOM
    var myChart = echarts.init(document.getElementById("chart"));
    // draw chart
    myChart.setOption({
      xAxis: {
        data: resultSet.chartPivot().map(i => i.x)
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: resultSet.chartPivot().map(i => i["Orders.count"])
        }
      ]
    });
  });
