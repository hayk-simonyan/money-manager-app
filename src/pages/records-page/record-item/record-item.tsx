import React from 'react';

import { IonRow, IonCol, IonCard, IonItem, IonCardContent } from '@ionic/react';

interface RecordItemProps {
  id: string;
  type: string;
  amount: string;
}

const RecordItem: React.FC<RecordItemProps> = ({ id, type, amount }) => (
  <IonRow>
    <IonCol>
      <IonCard>
        <IonItem routerLink={`/records/${id}`} lines='none' button>
          <IonCardContent>
            <h2>{type}</h2>
            <h2>{amount}$</h2>
          </IonCardContent>
        </IonItem>
      </IonCard>
    </IonCol>
  </IonRow>
);

export default RecordItem;
