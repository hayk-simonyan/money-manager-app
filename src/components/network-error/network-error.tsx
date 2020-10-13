import React from 'react';

import { refreshOutline } from 'ionicons/icons';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';

import './network-error.css';
import Header from '../header/header';

export default function NetworkError() {
  return (
    <IonPage>
      <Header title='No Internet' menu={true} />
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>No Internet</IonCardTitle>
          <IonCardSubtitle>
            Check your internet connection and try again
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
      <IonItem lines='none' button>
        <IonIcon icon={refreshOutline} />
        <IonLabel>Refresh</IonLabel>
      </IonItem>
    </IonPage>
  );
}
