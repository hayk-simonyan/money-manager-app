import React from 'react';
import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonSkeletonText,
  IonText,
} from '@ionic/react';

import './chart-skeleton.css';

export default function ChartSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonItem className='horizontal-center' lines='none'>
          <IonAvatar className='avatar'>
            <IonSkeletonText />
          </IonAvatar>
        </IonItem>
        {/* <IonSkeletonText animated /> */}
        {/* <IonSkeletonText animated /> */}
      </IonRow>
      <IonRow className='ion-text-center'>
        <IonItem className='horizontal-center' lines='none'>
          <IonText>No data available for this period</IonText>
        </IonItem>
      </IonRow>
    </IonGrid>
  );
}
