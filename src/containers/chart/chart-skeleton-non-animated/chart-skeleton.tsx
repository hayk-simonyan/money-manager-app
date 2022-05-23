import React from 'react';
import {
  IonAvatar,
  IonGrid,
  IonItem,
  IonRow,
  IonSkeletonText,
  IonText,
} from '@ionic/react';

import './chart-skeleton.css';

export default function ChartSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonItem
          style={{ marginTop: '15px' }}
          className='horizontal-center'
          lines='none'
        >
          <IonAvatar className='avatar'>
            <IonSkeletonText />
          </IonAvatar>
        </IonItem>
      </IonRow>
      <IonRow className='ion-text-center'>
        <IonItem className='horizontal-center' lines='none'>
          <IonText>No data available for this period</IonText>
        </IonItem>
      </IonRow>
    </IonGrid>
  );
}
