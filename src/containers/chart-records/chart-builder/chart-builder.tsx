import React from 'react';
import { Polar } from 'react-chartjs-2';

interface Props {
  labels: any;
  data: any;
}

const ChartBuilder: React.FC<Props> = ({ labels, data }) => {
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
        ],
      },
    ],
  };

  return (
    <React.Fragment>
      <Polar
        data={mainData}
        options={{
          title: {
            display: false,
            text: 'Categories',
            fontSize: 25,
          },
          legend: {
            display: false,
            position: 'right',
          },
        }}
      />
    </React.Fragment>
  );
};

export default ChartBuilder;
