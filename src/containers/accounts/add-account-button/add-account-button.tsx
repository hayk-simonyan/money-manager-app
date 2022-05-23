import React from 'react';
import {
  IonCard,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

import './add-account-button.css';

const AddAccountButton: React.FC = () => (
  <IonCard className='add-account-button-wrapper'>
    <IonButtons>
      <IonButton routerLink='/accounts/new' className='center'>
        <IonLabel color='primary' slot='start'>
          Add
        </IonLabel>
        <IonIcon icon={addOutline} slot='end' />
      </IonButton>
    </IonButtons>
  </IonCard>
);

export default AddAccountButton;
