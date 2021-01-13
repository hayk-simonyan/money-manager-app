import React from 'react';

import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface HomepageControlsProps {
  segmentValue: 'charts' | 'records';
  segmentChangeHandler: (value: 'charts' | 'records') => void;
}

const HomepageControls: React.FC<HomepageControlsProps> = ({
  segmentValue,
  segmentChangeHandler,
}) => {
  const onChangeHandler = (e: CustomEvent) => {
    segmentChangeHandler(e.detail.value);
  };

  return (
    <IonSegment value={segmentValue} onIonChange={onChangeHandler}>
      <IonSegmentButton value='charts'>
        <IonLabel>Stats</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value='records'>
        <IonLabel>Records</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default HomepageControls;
