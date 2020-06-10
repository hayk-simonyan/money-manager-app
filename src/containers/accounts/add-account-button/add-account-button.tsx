import React from 'react';

import { IonCol, IonCard, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

const AddAccountButton: React.FC = () => (
  <IonCol size='4'>
    <IonCard>
      <IonButtons>
        <IonButton routerLink='/accounts/new'>
          <IonIcon icon={addOutline} slot='icon-only' />
        </IonButton>
      </IonButtons>
    </IonCard>
  </IonCol>
);

export default AddAccountButton;
