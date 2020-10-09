import React from 'react';

import { refreshOutline } from 'ionicons/icons';
import {
  IonCardSubtitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';

import './network-error.css';

export default function NetworkError() {
  return (
    <IonPage>
      <IonContent className='network-error-container'>
        <div className='vertical-center horizontal-center ion-text-center'>
          <h1>No Internet</h1>
          <IonCardSubtitle>
            Check your internet connection and try again
          </IonCardSubtitle>
          <IonItem lines='none'>
            <IonIcon icon={refreshOutline} />
            <IonLabel>Refresh</IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
}
