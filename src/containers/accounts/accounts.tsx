import React from 'react';

import {
  IonGrid,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';

import AccountItem from './account-item/account-item';

const Accounts: React.FC = () => (
  <IonCard>
    <IonCardHeader color='primary'>
      <IonCardTitle>Accounts</IonCardTitle>
    </IonCardHeader>
    <IonGrid>
      <IonRow>
        <AccountItem children='Cash' />
        <AccountItem children='Savings' />
        <AccountItem children='Cart' />
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default Accounts;
