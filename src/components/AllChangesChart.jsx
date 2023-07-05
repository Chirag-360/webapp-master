import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Spinner from './Spinner'


const AllChangesChart = () => {
  const [chartOptions, setChartOptions] = useState(null);

  let data, processedData, options;

  const { addDeleteData, commitData, chartval, isLoading } = useSelector(state => state.repoReducer)

  const checkVal = async () => {
    if (chartval === 'additions') {
      data = addDeleteData || [];
      processedData = Array.isArray(data)
        ? data.map((entry) => [
          new Date(entry[0] * 1000).toLocaleDateString(),
          entry[1],
        ])
        : [];
    } else if (chartval === 'deletions') {
      data = addDeleteData || [];
      processedData = Array.isArray(data)
        ? data.map((entry) => [
          new Date(entry[0] * 1000).toLocaleDateString(),
          Math.abs(entry[2]),
        ]) : [];
    } else {
      data = commitData || [];
      processedData = Array.isArray(data)
        ? data.map((entry) => [
          new Date(entry.week * 1000).toLocaleDateString(),
          entry.total,
        ]) : [];
    }
  }

  const makeOption = async () => {
    options = {
      title: {
        text: 'Total Changes',
      },
      xAxis: {
        type: 'category',
        title: {
          text: 'Week',
        },
        labels: {
          rotation: -45,
          formatter: function () {
            return this.value;
          },
        },
        categories: processedData.map((entry) => entry[0]),
      },
      yAxis: {
        title: {
          text: chartval,
        },
      },
      series: [
        {
          name: chartval,
          data: processedData.map((entry) => entry[1]),
        },
      ],
    };
  }
  const fetchData = async () => {
    await checkVal();
    await makeOption();
    setChartOptions(options);
  }
  
  useEffect(() => {
    if ((addDeleteData && addDeleteData.length > 0) || (commitData && commitData.length > 0)) {
      fetchData();
    }

  }, [addDeleteData, commitData, chartval]);

  return (
    <>
      {chartOptions &&
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
            />
          )}
        </>
      }
    </>

  )

}

export default AllChangesChart;