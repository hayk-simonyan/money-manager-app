import React from 'react';

import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

interface AddButtonProps {
  onClickHandler?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClickHandler }) => (
  <IonFab
    style={{
      pposition: 'fixed',
      bottom: '10px',
      right: '10px',
    }}
  >
    <IonFabButton onClick={onClickHandler}>
      <IonIcon icon={add} />
    </IonFabButton>
  </IonFab>
);

export default AddButton;
