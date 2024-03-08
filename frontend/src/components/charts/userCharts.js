import ReactECharts from "echarts-for-react";

function UserChart(props) {
  const { users } = props;

  const usersCountPerDay = users.reduce((acc, user) => {
    const addedDate = new Date(user.addedat).toLocaleDateString();
    acc[addedDate] = (acc[addedDate] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(usersCountPerDay);
  const counts = Object.values(usersCountPerDay);

  const eChartsOption = {
    title: {
      text: "Registered users per day",
      textStyle: {
        color: "#413f81"
      }
    },
    xAxis: {
      type: "category",
      data: dates,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        name: "Number of Users",
        type: "line",
        data: counts,
        smooth: true,
        lineStyle: {
          color: "#f3790f",
        },
        itemStyle: {
          color: "#413f81",
        },
      },
    ],
  };

  return (
    <div className="d-flex justify-content-center">
      <ReactECharts
        style={{ height: "350px", width: "95%" }}
        option={eChartsOption}
      />
    </div>
  );
}

export default UserChart;
