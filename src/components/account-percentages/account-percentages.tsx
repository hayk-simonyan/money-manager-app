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
  colors: string[];
}

const AccountPercentages: React.FC<Props> = ({ accounts, colors }) => {
  // filter for colors
  const filteredAccounts: Account[] = [];
  accounts.map((account) => {
    if (account.percentage !== 0) filteredAccounts.push(account);
  });

  return (
    <IonList>
      {filteredAccounts.map((account, index) =>
        account.total > 0 ? (
          <IonItem key={account._id} lines='none'>
            <IonCol size='2'>
              <IonLabel
                className='ion-text-center'
                style={{
                  backgroundColor: colors[index],
                  padding: '4px',
                  borderRadius: '4px',
                }}
              >
                {account.percentage}%{' '}
              </IonLabel>
            </IonCol>
            <IonCol size='6'>
              <IonLabel>{account.name}</IonLabel>
            </IonCol>
            <IonCol size='4'>
              <IonLabel className='ion-text-end'>
                {`${localStorage.getItem('currency') || '$'} `}
                {account.total}
              </IonLabel>
            </IonCol>
          </IonItem>
        ) : null
      )}
    </IonList>
  );
};

export default AccountPercentages;
