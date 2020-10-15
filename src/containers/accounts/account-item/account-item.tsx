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
  type: string;
  name: string;
  total: number;
}

const AccountItem: React.FC<Props> = ({ id, type, name, total }) => (
  <IonCol size='6' style={{ padding: 0 }}>
    <IonCard>
      <IonItem routerLink={`/accounts/${id}`} button lines='none'>
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
