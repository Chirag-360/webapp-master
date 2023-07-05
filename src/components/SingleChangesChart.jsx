import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Spinner from './Spinner'


const SingleChangesChart = () => {

  const { contributorData, chartval, isLoading } = useSelector(state => state.repoReducer)

  const getCategoryValue = (week) => {
    if (chartval === "additions") {
      return week.a;
    } else if (chartval === "deletions") {
      return week.d;
    } else {
      return week.c;
    }
  };

  const seriesData = Array.isArray(contributorData)
    ? contributorData.map((contributor) => ({
      name: contributor.author.login,
      data: contributor.weeks.map((week) => ({
        x: week.w * 1000,
        y: getCategoryValue(week),
      })),
    })) : []


  const options = {
    title: {
      text: 'Contributor Changes',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Week',
      },
      labels: {
        formatter: function () {
          return new Date(this.value).toLocaleDateString();
        },
      },
    },
    yAxis: {
      title: {
        text: chartval,
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>${chartval}: ${this.point.y}<br/>Date: ${new Date(
          this.point.x
        ).toLocaleDateString()}`;
      },
    },
    series: seriesData,
  };

  return (
    <>
      {contributorData && contributorData.length > 0 ? (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          )}
        </>
      ) : null}
    </>
  )
}

export default SingleChangesChart;