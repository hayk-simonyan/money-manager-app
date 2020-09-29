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
        <IonCol className='container'>
          <IonItem className='vertical-center' lines='none'>
            <IonAvatar className='avatar '>
              <IonSkeletonText animated />
            </IonAvatar>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
