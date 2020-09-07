import React from 'react';

import ChartBuilder from './chart-builder/chart-builder';

interface MonthlyRecord {
  _id: string;
  type: string;
  icon: string;
  name: string;
  total: number;
}

interface Props {
  records: any;
}

const ChartRecords: React.FC<Props> = ({
  records: { records, incomes, expences, recordsByCategories, cashflow },
}) => {
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

  return (
    <React.Fragment>
      <ChartBuilder labels={expenceLabels} data={expenceData} />
    </React.Fragment>
  );
};

export default ChartRecords;
