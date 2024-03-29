import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

import RecordPercentages from '../../../components/record-percentages/record-percentages';

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

interface Props {
  labels: any;
  data: any;
  recordsByCategories: any;
  recordsType: string;
}

const ChartBuilder: React.FC<Props> = ({
  labels,
  data,
  recordsByCategories,
  recordsType,
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

  return (
    <React.Fragment>
      <Doughnut
        height={180}
        data={mainData}
        options={{
          plugins: {
            labels: [],
          },
          title: {
            display: true,
            // text: 'Chart',
            fontSize: 20,
          },
          legend: {
            display: false,
            position: 'right',
          },
        }}
      />

      <RecordPercentages
        recordsByCategories={recordsByCategories}
        recordsType={recordsType}
        colors={colors}
      />
    </React.Fragment>
  );
};

export default ChartBuilder;
