import React from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from '@ionic/react';

const HeaderRecords: React.FC = () => (
  <IonHeader>
    <IonToolbar color='primary'>
      <IonButtons slot='start'>
        <IonBackButton defaultHref='/' />
      </IonButtons>

      <IonTitle>Records</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default HeaderRecords;
