import React from 'react';

import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface Props {
  segmentValue: 'expences' | 'incomes';
  segmentChangeHandler: (value: 'expences' | 'incomes') => void;
}

const ChartControls: React.FC<Props> = ({
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
      <IonSegmentButton value='incomes'>
        <IonLabel>Incomes</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default ChartControls;
