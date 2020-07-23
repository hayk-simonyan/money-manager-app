import React from 'react';

import { IonFab, IonIcon, IonFabButton } from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';

interface Props {
  onClickHandler?: () => void;
  url?: string;
}

const SubmitButton: React.FC<Props> = ({ onClickHandler, url }) => (
  <IonFab horizontal='end' vertical='bottom' slot='fixed'>
    <IonFabButton
      type='submit'
      color='success'
      routerLink={url}
      onClick={onClickHandler}
    >
      <IonIcon icon={checkmarkOutline} />
    </IonFabButton>
  </IonFab>
);

export default SubmitButton;
