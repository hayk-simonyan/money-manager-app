import React from 'react';

import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonSkeletonText,
} from '@ionic/react';

export default function AccountsSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '70%' }} />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol offset='8'>
          <IonItem lines='none'>
            <IonSkeletonText animated style={{ width: '60%' }} />
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
