import React from 'react';

import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
} from '@ionic/react';
import {
  walletOutline,
  listOutline,
  informationCircleOutline,
} from 'ionicons/icons';

const Menu: React.FC = () => (
  <IonMenu contentId='main' side='start' menuId='id'>
    <IonHeader>
      <IonToolbar color='primary'>
        <IonItem color='primary' button>
          <IonTitle>John Smith</IonTitle>
        </IonItem>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonMenuToggle>
          <IonItem
            lines='full'
            button
            routerLink='/home'
            routerDirection='none'
          >
            <IonIcon slot='start' icon={walletOutline} />
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem
            lines='full'
            button
            routerLink='/records'
            routerDirection='none'
          >
            <IonIcon slot='start' icon={listOutline} />
            <IonLabel>Records</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem
            lines='full'
            button
            routerLink='/about'
            routerDirection='none'
          >
            <IonIcon slot='start' icon={informationCircleOutline} />
            <IonLabel>About</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default Menu;
