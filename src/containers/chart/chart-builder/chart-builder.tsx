import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

interface Props {
  labels: any;
  data: any;
  accountNames?: any;
  accountTotals?: any;
  cashflowDates?: any;
  cashflowAmounts?: any;
}

const ChartBuilder: React.FC<Props> = ({
  labels,
  data,
  accountNames,
  accountTotals,
  cashflowDates,
  cashflowAmounts,
}) => {
  const mainData = {
    labels: labels,
    datasets: [
      {
        label: 'Records',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          '#845EC2',
          '#D65DB1',
          '#FF9671',
          '#FF6F91',
          '#FFC75F',
          '#F9F871',
          '#00C9A7',
          '#B39CD0',
          '#457b9d',
          '#2a9d8f',
          '#9d4edd',
          '#fcbf49',
          '#ffb4a2',
          '#ade8f4',
          '#2a9d8f',
          '#e9c46a',
          '#f4a261',
          '#e76f51',
          '#a8dadc',
          '#457b9d',
          '#cb997e',
          '#ddbea9',
        ],
      },
    ],
  };

  const cashflowData = {
    labels: cashflowDates,
    datasets: [
      {
        label: 'Cashflow',
        data: cashflowAmounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          '#457b9d',
          '#2a9d8f',
          '#9d4edd',
          '#fcbf49',
          '#ffb4a2',
          '#ade8f4',
          '#2a9d8f',
          '#e9c46a',
          '#f4a261',
          '#e76f51',
          '#a8dadc',
          '#457b9d',
          '#cb997e',
          '#ddbea9',
        ],
      },
    ],
  };

  const balanceData = {
    labels: accountNames,
    datasets: [
      {
        label: 'Cashflow',
        data: accountTotals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          '#457b9d',
          '#2a9d8f',
          '#9d4edd',
          '#fcbf49',
          '#ffb4a2',
          '#ade8f4',
          '#2a9d8f',
          '#e9c46a',
          '#f4a261',
          '#e76f51',
          '#a8dadc',
          '#457b9d',
          '#cb997e',
          '#ddbea9',
        ],
      },
    ],
  };

  return (
    <React.Fragment>
      <Pie
        data={mainData}
        options={{
          title: {
            display: true,
            text: 'Categories',
            fontSize: 25,
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 7,
            },
          },
        }}
      />
      {accountNames && accountTotals && (
        <Bar
          data={balanceData}
          options={{
            title: {
              display: 'Chart',
              text: 'Balance Trend',
              fontSize: 25,
            },
            legend: {
              display: false,
              position: 'right',
            },
          }}
        />
      )}
      {cashflowDates && cashflowAmounts && (
        <Line
          data={cashflowData}
          options={{
            title: {
              display: true,
              text: 'Cashflow',
              fontSize: 25,
            },
            legend: {
              display: false,
              position: 'right',
            },
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ChartBuilder;
