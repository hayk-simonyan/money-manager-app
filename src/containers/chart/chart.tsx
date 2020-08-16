import React, { useState } from 'react';

import { IonCard, IonCardHeader, IonCardTitle, IonPage } from '@ionic/react';

import ChartBuilder from './chart-builder/chart-builder';
import ChartControls from '../../components/chart-controls/homepage-controls';

interface MonthlyRecord {
  _id: string;
  type: string;
  icon: string;
  name: string;
  total: number;
}

interface Props {
  records: {
    monthlyRecords: {
      monthlyRecords: any;
      monthlyIncomes: number;
      monthlyExpences: number;
      monthlyRecordsByCategories: any;
    };
  };
}

const Chart: React.FC<Props> = ({
  records: {
    monthlyRecords: {
      monthlyRecords,
      monthlyIncomes,
      monthlyExpences,
      monthlyRecordsByCategories,
    },
  },
}) => {
  const [segment, setSegment] = useState<'expences' | 'incomes'>('expences');

  const expenceLabels: any = [];
  const expenceData: any = [];

  const incomeLabels: any = [];
  const incomeData: any = [];

  monthlyRecordsByCategories.forEach((record: MonthlyRecord) => {
    if (record.type === 'expences') {
      expenceLabels.push(record.name);
      expenceData.push(record.total);
    } else {
      incomeLabels.push(record.name);
      incomeData.push(record.total);
    }
  });

  return (
    <React.Fragment>
      <ChartControls
        segmentValue={segment}
        segmentChangeHandler={(e) => setSegment(e)}
      />
      {segment === 'expences' ? (
        <ChartBuilder labels={expenceLabels} data={expenceData} />
      ) : (
        <ChartBuilder labels={incomeLabels} data={incomeData} />
      )}
    </React.Fragment>
  );
};

export default Chart;
