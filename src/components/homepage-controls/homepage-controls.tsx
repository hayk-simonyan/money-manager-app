import React from 'react';

import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface HomepageControlsProps {
  segmentValue: 'main' | 'chart';
  segmentChangeHandler: (value: 'main' | 'chart') => void;
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
      <IonSegmentButton value='main'>
        <IonLabel>Main</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value='chart'>
        <IonLabel>Chart</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default HomepageControls;
