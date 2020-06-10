import React from 'react';

import {
  IonGrid,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

import AccountItem from './account-item/account-item';
import AddAccountButton from './add-account-button/add-account-button';

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
        <AccountItem children='Cart' />
        <AddAccountButton />
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default Accounts;
