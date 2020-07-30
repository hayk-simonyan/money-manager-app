import React from 'react';

import { IonCol, IonText, IonCard, IonItem, IonRow } from '@ionic/react';

interface Props {
  id: string;
  icon: string;
  name: string;
  total: number;
}

const AccountItem: React.FC<Props> = ({ id, icon, name, total }) => (
  <IonCol size='4'>
    <IonCard>
      <IonItem routerLink={`/accounts/${id}`} button>
        <IonRow>
          <IonText color='primary'>{name}</IonText>
          <IonText>{total}</IonText>
        </IonRow>
      </IonItem>
    </IonCard>
  </IonCol>
);

export default AccountItem;
