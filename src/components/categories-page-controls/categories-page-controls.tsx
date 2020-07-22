import React from 'react';

import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface Props {
  segmentValue: 'expences' | 'income';
  segmentChangeHandler: (value: 'expences' | 'income') => void;
}

const CategoriesPageControls: React.FC<Props> = ({
  segmentValue,
  segmentChangeHandler,
}) => {
  const onChangeHandler = (e: CustomEvent) => {
    segmentChangeHandler(e.detail.value);
  };

  return (
    <IonSegment value={segmentValue} onIonChange={onChangeHandler}>
      <IonSegmentButton value='expences'>
        <IonLabel>Expences</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value='income'>
        <IonLabel>Income</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default CategoriesPageControls;
