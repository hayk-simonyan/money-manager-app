import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IonContent } from '@ionic/react';

import ChartBuilder from './chart-builder/chart-builder';
import ChartControls from '../../components/chart-controls/homepage-controls';
import ChartSkeleton from './chart-skeleton/chart-skeleton';

interface MonthlyRecord {
  _id: string;
  type: string;
  icon: string;
  name: string;
  total: number;
}

interface Account {
  _id: string;
  icon: string;
  name: string;
  total: string;
}

interface Props {
  records: {
    records: any;
    incomes: number;
    expences: number;
    recordsByCategories: any;
    cashflow: any;
    loading: boolean;
  };
  accounts: { accounts: any };
}

const Chart: React.FC<Props> = ({
  records: {
    records,
    incomes,
    expences,
    recordsByCategories,
    cashflow,
    loading,
  },
  accounts: { accounts },
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

  const accountNames: any = [];
  const accountTotals: any = [];
  accounts.forEach((account: Account) => {
    accountNames.push(account.name);
    accountTotals.push(account.total);
  });

  const cashflowAmounts: any = [];
  const cashflowDates: any = [];
  cashflow.forEach((flow: any) => {
    if (cashflowDates.includes(flow.date.slice(8, -14))) {
      const index = cashflowDates.indexOf(flow.date.slice(8, -14));
      cashflowAmounts[index] = cashflowAmounts[index] + flow.amount;
    } else {
      cashflowAmounts.push(flow.amount);
      cashflowDates.push(flow.date.slice(8, -14));
    }
  });

  return (
    <React.Fragment>
      <IonContent>
        <ChartControls
          segmentValue={segment}
          segmentChangeHandler={(e) => setSegment(e)}
        />
        {loading ? (
          <ChartSkeleton />
        ) : segment === 'expences' ? (
          <ChartBuilder
            labels={expenceLabels}
            data={expenceData}
            accountNames={accountNames}
            accountTotals={accountTotals}
          />
        ) : (
          <ChartBuilder
            labels={incomeLabels}
            data={incomeData}
            cashflowAmounts={cashflowAmounts}
            cashflowDates={cashflowDates}
          />
        )}
      </IonContent>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => ({});

const mapStateToProps = (state: any) => ({
  records: state.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
