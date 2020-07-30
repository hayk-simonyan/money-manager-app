import React from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonBackButton,
} from '@ionic/react';

interface Props {
  title: string;
  menu: boolean;
}

const Header: React.FC<Props> = ({ title, menu }) => (
  <IonHeader>
    <IonToolbar color='primary'>
      <IonButtons slot='start'>
        {menu ? (
          <IonMenuButton menu='id' auto-hide='false' />
        ) : (
          <IonBackButton defaultHref='/' />
        )}
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;
