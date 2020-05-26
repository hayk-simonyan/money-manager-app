import React from 'react';

import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

const AddButton: React.FC = () => (
  <IonFab
    style={{
      pposition: 'fixed',
      bottom: '10px',
      right: '10px',
    }}
  >
    <IonFabButton routerLink='/records'>
      <IonIcon icon={add} />
    </IonFabButton>
  </IonFab>
);

export default AddButton;
