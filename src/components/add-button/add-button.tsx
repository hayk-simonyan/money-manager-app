import React from 'react';

import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

interface Props {
  url: string;
}

const AddButton: React.FC<Props> = ({ url }) => (
  <IonFab horizontal='end' vertical='bottom' slot='fixed'>
    <IonFabButton color='primary' routerLink={url}>
      <IonIcon icon={add} />
    </IonFabButton>
  </IonFab>
);

export default AddButton;
