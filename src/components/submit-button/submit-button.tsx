import React from 'react';

import { IonFab, IonIcon, IonFabButton } from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';

interface SubmitButtonProps {
  onClickHandler?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClickHandler }) => (
  <IonFab horizontal='end' vertical='bottom' slot='fixed'>
    <IonFabButton
      type='submit'
      size='small'
      color='success'
      onClick={onClickHandler}
    >
      <IonIcon icon={checkmarkOutline} />
    </IonFabButton>
  </IonFab>
);

export default SubmitButton;
