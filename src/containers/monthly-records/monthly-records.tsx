import React from 'react';

import {
  IonGrid,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonToolbar,
} from '@ionic/react';
import RecordItem from './record-item/record-item';

const MonthlyRecords: React.FC = () => (
  <IonCard>
    <IonCardHeader color='default'>
      <IonToolbar>
        <IonCardTitle>Monthly Records</IonCardTitle>
      </IonToolbar>
    </IonCardHeader>
    <IonGrid>
      <IonRow>
        <RecordItem children='Income' />
        <RecordItem children='Expences' />
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default MonthlyRecords;
