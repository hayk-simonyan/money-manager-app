import React from 'react';
import { IonGrid, IonRow } from '@ionic/react';
import RecordItem from './record-item/record-item';

const MonthlyRecords: React.FC = () => (
  <IonGrid>
    <IonRow>
      <RecordItem children='Incomes' />
      <RecordItem children='Expences' />
      <RecordItem children='Balance' />
    </IonRow>
  </IonGrid>
);

export default MonthlyRecords;
