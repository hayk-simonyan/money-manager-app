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
import { desktopOutline } from 'ionicons/icons';

const Menu: React.FC = () => (
  <IonMenu contentId='main' side='start' menuId='id'>
    <IonHeader>
      <IonToolbar color='primary'>
        <IonTitle>Start Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonMenuToggle>
          <IonItem button routerLink='/home' routerDirection='none'>
            <IonIcon slot='start' icon={desktopOutline} />
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem button routerLink='/records' routerDirection='none'>
            <IonIcon slot='start' icon={desktopOutline} />
            <IonLabel>Records</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem button routerLink='/about' routerDirection='none'>
            <IonIcon slot='start' icon={desktopOutline} />
            <IonLabel>About</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default Menu;
