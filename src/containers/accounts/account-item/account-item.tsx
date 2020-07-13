import React from 'react';

import { IonCol, IonText, IonCard, IonItem, IonRow } from '@ionic/react';

interface Props {
  icon: string;
  name: string;
  total: number;
}

const AccountItem: React.FC<Props> = ({ icon, name, total }) => (
  <IonCol size='4'>
    <IonCard>
      <IonItem button>
        <IonRow>
          <IonText color='primary'>{name}</IonText>
          <IonText>{total}</IonText>
        </IonRow>
      </IonItem>
    </IonCard>
  </IonCol>
);

export default AccountItem;
