import React, { useState } from 'react';

import { IonCard, IonCardHeader, IonCardTitle, IonPage } from '@ionic/react';

import ChartBuilder from './chart-builder/chart-builder';
import ChartControls from '../../components/chart-controls/homepage-controls';

interface Record {
  _id: string;
  type: string;
  account: string;
  category: string;
  date: Date;
  amount: number;
  note: string;
}

interface Props {
  records: {
    monthlyRecords: {
      monthlyRecords: any;
      monthlyIncomes: number;
      monthlyExpences: number;
    };
  };
}

const Chart: React.FC<Props> = ({
  records: {
    monthlyRecords: { monthlyRecords, monthlyIncomes, monthlyExpences },
  },
}) => {
  const [segment, setSegment] = useState<'expences' | 'incomes'>('expences');

  const expences: any = [];
  const incomes: any = [];
  monthlyRecords.forEach((record: Record) => {
    if (record.type === 'expences') {
      expences.push(record);
    } else {
      incomes.push(record);
    }
  });

  return (
    <React.Fragment>
      <ChartControls
        segmentValue={segment}
        segmentChangeHandler={(e) => setSegment(e)}
      />
      {segment === 'expences' ? (
        <ChartBuilder records={expences} />
      ) : (
        <ChartBuilder records={incomes} />
      )}
    </React.Fragment>
  );
  //  <IonPage>
  //    <IonCard>
  //     <IonCardHeader color='default'>
  //       <IonCardTitle>Chart</IonCardTitle>
  //     </IonCardHeader>
  //   </IonCard>
  //  </IonPage>
};

export default Chart;
