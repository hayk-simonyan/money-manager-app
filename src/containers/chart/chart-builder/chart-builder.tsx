import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

import ChartSkeleton from '../chart-skeleton-non-animated/chart-skeleton';
import AccountPercentages from '../../../components/account-percentages/account-percentages';

const colors = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',

  '#E6EE9C',
  '#81D4FA',
  '#FFCC80',
  '#CE93D8',
  '#FFAB91',
  '#C5E1A5',
  '#80DEEA',
  '#FFF59D',
  '#9FA8DA',
  '#F48FB1',
  '#90CAF9',
  '#ef9a9a',
  '#80CBC4',
  '#FFE082',
  '#B39DDB',
  '#A5D6A7',

  'rgb(255,122,175)',
  'rgb(242,255,158)',
  'rgb(107,255,201)',
  'rgb(255,195,91)',
  'rgb(255,147,240)',
  'rgb(122,237,255)',
  'rgb(175,147,240)',

  'rgb(221,28,92)',
  'rgb(122,227,128)',
  'rgb(233,233,97)',
  'rgb(64,236,190)',
  'rgb(68,170,255)',
  'rgb(238,119,51)',
  'rgb(136,68,255)',
];

interface Props {
  labels: any;
  data: any;
  accountNames?: any;
  accountTotals?: any;
  cashflowDates?: any;
  cashflowAmounts?: any;
  recordsByCategories?: any;
  recordsType: string;
  accounts?: any;
}

const ChartBuilder: React.FC<Props> = ({
  labels,
  data,
  accountNames,
  accountTotals,
  cashflowDates,
  cashflowAmounts,
  recordsByCategories,
  recordsType,
  accounts,
}) => {
  const mainData = {
    labels: labels,
    datasets: [
      {
        label: 'Records',
        data: data,
        backgroundColor: colors,
      },
    ],
  };

  const cashflowData = {
    labels: cashflowDates,
    datasets: [
      {
        label: 'Cashflow',
        data: cashflowAmounts,
        backgroundColor: colors,
      },
    ],
  };

  const balanceData = {
    labels: accountNames,
    datasets: [
      {
        label: 'Balance Trend',
        data: accountTotals,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div style={{ paddingBottom: '3.7rem' }}>
      <div className='chart-container'>
        {data.length > 0 ? (
          <Pie
            height={165}
            data={mainData}
            options={{
              plugins: {
                labels: [
                  {
                    render: 'label',
                    position: 'outside',
                  },
                  {
                    render: 'percentage',
                  },
                ],
              },
              title: { display: false },
              legend: {
                display: false,
                position: 'right',
                labels: {
                  fontSize: 16,
                  padding: 7,
                  usePointStyle: true,
                },
              },
            }}
          />
        ) : (
          <ChartSkeleton />
        )}
      </div>

      <div style={{ clear: 'both' }}></div>

      {accountNames && accountTotals && (
        <div className='account-percentages'>
          <Bar
            data={balanceData}
            options={{
              plugins: {
                labels: [
                  {
                    render: 'value',
                    position: 'outside',
                  },
                ],
              },
              title: {
                display: 'Chart',
                text: 'Balance Trend',
                fontSize: 20,
              },
              legend: {
                display: false,
              },
            }}
          />
          <AccountPercentages accounts={accounts} colors={colors} />
        </div>
      )}

      {cashflowDates && cashflowAmounts && (
        <Line
          data={cashflowData}
          options={{
            title: {
              display: true,
              text: 'Cashflow',
              fontSize: 20,
            },
            legend: {
              display: false,
              position: 'right',
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartBuilder;
