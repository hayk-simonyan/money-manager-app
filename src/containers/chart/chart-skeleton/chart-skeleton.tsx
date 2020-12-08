import React from 'react';
import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonSkeletonText,
} from '@ionic/react';

import './chart-skeleton.css';

export default function ChartSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonItem className='horizontal-center' lines='none'>
          <IonAvatar className='avatar'>
            <IonSkeletonText animated />
          </IonAvatar>
        </IonItem>
        <IonSkeletonText animated />
        <IonSkeletonText animated />
      </IonRow>
    </IonGrid>
  );
}
