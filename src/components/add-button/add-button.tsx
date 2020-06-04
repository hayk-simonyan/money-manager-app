import React from 'react';

import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

const AddButton: React.FC = () => (
  <IonFab horizontal='end' vertical='bottom' slot='fixed'>
    <IonFabButton color='success' routerLink='/records/new'>
      <IonIcon icon={add} />
    </IonFabButton>
  </IonFab>
);

export default AddButton;
