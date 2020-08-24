import React, { useState, useEffect } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import { connect } from 'react-redux';
import { getRecords } from '../../redux/records/record.actions';

import ChartBuilder from './chart-builder/chart-builder';
import ChartControls from '../../components/chart-controls/homepage-controls';

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
  };
  accounts: { accounts: any };
  getRecords: (y?: string, m?: string) => void;
}

const Chart: React.FC<Props> = ({
  records: { records, incomes, expences, recordsByCategories, cashflow },
  accounts: { accounts },
  getRecords,
}) => {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth().toString());
  const [year, setYear] = useState(date.getFullYear().toString());
  if (month.length === 1) setMonth(`0${month}`);

  useEffect(() => {
    getRecords(year, month);
  }, [month]);

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
  console.log(expenceLabels);

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
      <ChartControls
        segmentValue={segment}
        segmentChangeHandler={(e) => setSegment(e)}
      />
      <IonSelect
        value={month}
        cancelText='Cancel'
        okText='Ok'
        onIonChange={(e: any) => setMonth(e.detail.value)}
      >
        <IonSelectOption value='00'>January</IonSelectOption>
        <IonSelectOption value='01'>February</IonSelectOption>
        <IonSelectOption value='02'>March</IonSelectOption>
        <IonSelectOption value='03'>April</IonSelectOption>
        <IonSelectOption value='04'>May</IonSelectOption>
        <IonSelectOption value='05'>June</IonSelectOption>
        <IonSelectOption value='06'>July</IonSelectOption>
        <IonSelectOption value='07'>August</IonSelectOption>
        <IonSelectOption value='08'>September</IonSelectOption>
        <IonSelectOption value='09'>October</IonSelectOption>
        <IonSelectOption value='10'>November</IonSelectOption>
        <IonSelectOption value='11'>December</IonSelectOption>
      </IonSelect>
      {segment === 'expences' ? (
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
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getRecords: (y?: string, m?: string) => dispatch(getRecords(y, m)),
});

const mapStateToProps = (state: any) => ({
  records: state.records,
});

export default connect(null, mapDispatchToProps)(Chart);
