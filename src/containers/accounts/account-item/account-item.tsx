import React from 'react';

import {
  IonCol,
  IonCard,
  IonItem,
  IonLabel,
  IonRow,
  IonGrid,
} from '@ionic/react';

interface Props {
  id: string;
  icon: string;
  name: string;
  total: number;
}

const AccountItem: React.FC<Props> = ({ id, icon, name, total }) => (
  <IonCol size='6'>
    <IonCard>
      <IonItem color='light' routerLink={`/accounts/${id}`} button>
        <IonGrid>
          <IonRow>
            <IonLabel color='primary'>{name}</IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel color={total >= 0 ? 'success' : 'danger'}>
              {total}
            </IonLabel>
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonCard>
  </IonCol>
);

export default AccountItem;
