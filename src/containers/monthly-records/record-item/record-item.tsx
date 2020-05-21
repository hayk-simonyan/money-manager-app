import React from 'react';

import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonText,
  IonCard,
} from '@ionic/react';

const RecordItem: React.FC = ({ children }) => (
  <IonCol>
    <IonCard>
      <IonItem lines='none' button>
        <IonGrid>
          <IonRow>
            <IonText color='primary'>{children}</IonText>
          </IonRow>
          <IonRow>
            <IonText>4000</IonText>
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonCard>
  </IonCol>
);

export default RecordItem;
