import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import AccountPercentages from '../../../components/account-percentages/account-percentages';

const pieColors = [
  '#FF6384',
  '#FF9F40',
  '#FFCD56',
  '#4BC0C0',
  '#36A2EB',

  'rgb(221,28,92)',
  'rgb(238,119,51)',
  'rgb(233,233,97)',
  'rgb(122,227,128)',
  'rgb(64,236,190)',
  'rgb(68,170,255)',
  'rgb(136,68,255)',

  'rgb(162,0,255)',
  'rgb(231,5,255)',
  'rgb(255,198,0)',
  'rgb(221,255,0)',
  'rgb(0,255,162)',
  'rgb(0,221,255)',
];

const barColors = [
  '#FFB1C1',
  '#9AD0F5',
  '#FFE6AA',
  '#A5DFDF',
  '#CCB2FF',
  '#FFCF9F',
  '#E4E5E7',

  'rgb(255,147,240)',
  'rgb(255,122,175)',
  'rgb(255,195,91)',
  'rgb(242,255,158)',
  'rgb(107,255,201)',
  'rgb(122,237,255)',
  'rgb(175,147,240)',

  'rgb(213,62,79) ',
  'rgb(244,109,67)',
  'rgb(253,174,97)',
  'rgb(254,224,139)',
  'rgb(255,255,191)',
  'rgb(230,245,152)',
  'rgb(171,221,164)',
  'rgb(136,221,170)',
  'rgb(102,194,165)',
  'rgb(55,182,155)',
  'rgb(50,136,189)',
  'rgb(113,172,188)',
];

const colors = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  '#845EC2',
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
];

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
        backgroundColor: pieColors,
      },
    ],
  };

  const cashflowData = {
    labels: cashflowDates,
    datasets: [
      {
        label: 'Cashflow',
        data: cashflowAmounts,
        backgroundColor: barColors,
      },
    ],
  };

  const balanceData = {
    labels: accountNames,
    datasets: [
      {
        label: 'Balance Trend',
        data: accountTotals,
        backgroundColor: barColors,
      },
    ],
  };

  return (
    <div style={{ paddingBottom: '3.7rem' }}>
      <div className='main-chart'>
        <Pie
          height={165}
          data={mainData}
          options={{
            title: { display: true },
            legend: {
              display: true,
              position: 'right',
              labels: {
                fontSize: 16,
                padding: 7,
                usePointStyle: true,
              },
            },
          }}
        />
      </div>

      {accountNames && accountTotals && (
        <div className='account-percentages'>
          <Bar
            data={balanceData}
            options={{
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
