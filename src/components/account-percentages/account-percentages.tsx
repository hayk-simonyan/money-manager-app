import React from 'react';
import { IonCol, IonItem, IonLabel, IonList } from '@ionic/react';

interface Account {
  _id: string;
  icon: string;
  name: string;
  total: number;
  percentage: number;
}

interface Props {
  accounts: Account[];
}

const AccountPercentages: React.FC<Props> = ({ accounts }) => (
  <IonList>
    {accounts.map((account) =>
      account.total > 0 ? (
        <IonItem key={account._id} lines='none'>
          <IonCol size='2'>
            <IonLabel>{account.percentage}% </IonLabel>
          </IonCol>
          <IonCol size='8'>
            <IonLabel>{account.name}</IonLabel>
          </IonCol>
          <IonCol size='2'>
            <IonLabel>{account.total}</IonLabel>
          </IonCol>
        </IonItem>
      ) : null
    )}
  </IonList>
);

export default AccountPercentages;