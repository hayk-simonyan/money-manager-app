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
    records: any;
    incomes: number;
    expences: number;
    recordsByCategories: any;
    cashflow: any;
  };
}

const Chart: React.FC<Props> = ({
  records: { records, incomes, expences, recordsByCategories, cashflow },
}) => {
  const [segment, setSegment] = useState<'expences' | 'incomes'>('expences');

  const expenceLabels: any = [];
  const expenceData: any = [];

  const incomeLabels: any = [];
  const incomeData: any = [];

  recordsByCategories.forEach((record: MonthlyRecord) => {
    if (record.type === 'expences') {
      expenceLabels.push(record.name);
      expenceData.push(record.total);
    } else {
      incomeLabels.push(record.name);
      incomeData.push(record.total);
    }
  });

  const cashflowAmounts: any = [];
  const cashflowDates: any = [];

  cashflow.forEach((flow: any) => {
    cashflowAmounts.push(flow.amount);
    cashflowDates.push(flow.date.slice(8, -14));
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
        <ChartBuilder
          labels={incomeLabels}
          data={incomeData}
          cashflowAmounts={cashflowAmounts}
          cashflowDates={cashflowDates}
        />
      )}
    </React.Fragment>
  );
};

export default Chart;
