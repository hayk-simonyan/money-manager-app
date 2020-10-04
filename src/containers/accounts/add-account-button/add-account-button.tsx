import React from 'react';
import {
  IonCol,
  IonCard,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

import './add-account-button.css';

const AddAccountButton: React.FC = () => (
  <IonCol offset='8' size='4'>
    <IonCard>
      <IonButtons>
        <IonButton routerLink='/accounts/new' className='center'>
          <IonLabel color='primary' slot='start'>
            Add
          </IonLabel>
          <IonIcon icon={addOutline} slot='end' />
        </IonButton>
      </IonButtons>
    </IonCard>
  </IonCol>
);

export default AddAccountButton;
