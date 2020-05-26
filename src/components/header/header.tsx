import React from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';

const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar color='primary'>
      <IonButtons slot='start'>
        <IonMenuButton menu='id' auto-hide='false' />
      </IonButtons>
      <IonTitle>Money Manager</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;
