import React from 'react';

import {
  IonCol,
  IonCard,
  IonItem,
  IonLabel,
  IonRow,
  IonGrid,
} from '@ionic/react';
import { useHistory } from 'react-router';

interface Props {
  id: string;
  type: string;
  name: string;
  total: number;
}

const AccountItem: React.FC<Props> = ({ id, type, name, total }) => {
  const history = useHistory();

  const redirectToAccount = (id: string) => {
    console.log(name, total, type);
    history.push(`/accounts/${id}`, { id, type, name, total });
  };

  return (
    <IonCol size='6' style={{ padding: 0 }}>
      <IonCard>
        <IonItem onClick={() => redirectToAccount(id)} button lines='none'>
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
};

export default AccountItem;
