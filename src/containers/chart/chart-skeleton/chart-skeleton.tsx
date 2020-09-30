import React from 'react';
import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonSkeletonText,
} from '@ionic/react';

import './chart-skeleton.css';

export default function ChartSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonCol
          offset='1'
          size='5'
          className='container 
        '
        >
          <IonItem className='vertical-center' lines='none'>
            <IonAvatar className='avatar '>
              <IonSkeletonText animated />
            </IonAvatar>
          </IonItem>
        </IonCol>
        <IonCol offset='2' size='4' className='container'>
          <IonItem lines='none'>
            <IonSkeletonText animated />
          </IonItem>
          <IonItem lines='none'>
            <IonSkeletonText animated />
          </IonItem>
          <IonItem lines='none'>
            <IonSkeletonText animated />
          </IonItem>
          <IonItem lines='none'>
            <IonSkeletonText animated />
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
