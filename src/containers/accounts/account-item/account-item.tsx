import React from 'react';

import { IonCol, IonText, IonCard, IonItem, IonRow } from '@ionic/react';

const AccountItem: React.FC = ({ children }) => (
  <IonCol size='4'>
    <IonCard>
      <IonItem button>
        <IonRow>
          <IonText color='primary'>{children}</IonText>
          <IonText>50650</IonText>
        </IonRow>
      </IonItem>
    </IonCard>
  </IonCol>
);

export default AccountItem;
