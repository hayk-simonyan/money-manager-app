import React from 'react';

import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonRow,
  IonSkeletonText,
} from '@ionic/react';

export default function AccountsSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonAvatar slot='start'>
            <IonSkeletonText animated />
          </IonAvatar>
        </IonCol>
        <IonCol>
          <IonAvatar slot='start'>
            <IonSkeletonText animated />
          </IonAvatar>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonAvatar slot='start'>
            <IonSkeletonText animated />
          </IonAvatar>
        </IonCol>
        <IonCol>
          <IonAvatar slot='start'>
            <IonSkeletonText animated />
          </IonAvatar>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
