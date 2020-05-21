import React from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonItem,
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';

const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar color='primary'>
      <IonItem color='primary' slot='start' lines='none' button>
        <IonIcon icon={menuOutline} />
      </IonItem>
      <IonTitle>Money Manager</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;
