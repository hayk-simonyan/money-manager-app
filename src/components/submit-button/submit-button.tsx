import React from 'react';

import { IonFab, IonButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

interface SubmitButtonProps {
  onClickHandler?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClickHandler }) => (
  <IonFab
    style={{
      pposition: 'fixed',
      bottom: '10px',
      right: '10px',
    }}
  >
    <IonButton color='success' onClick={onClickHandler}>
      <IonIcon icon={add} />
    </IonButton>
  </IonFab>
);

export default SubmitButton;
