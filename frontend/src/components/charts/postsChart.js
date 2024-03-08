import ReactECharts from "echarts-for-react";

function PostsChart(props) {

  const { carPosts } = props;

  const carPostsCountPerDay = carPosts.reduce((acc, carPost) => {
    const addedDate = new Date(carPost.addedat).toLocaleDateString();
    acc[addedDate] = (acc[addedDate] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(carPostsCountPerDay);
  const counts = Object.values(carPostsCountPerDay);

  const eChartsOption = {
    title: {
      text: "Number of posts per day",
      textStyle: {
        color: "#413f81",
      },
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
        name: "Number of posts",
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

export default PostsChart;
