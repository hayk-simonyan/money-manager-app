import React, { useState, useRef } from 'react';

import {
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonGrid,
  IonLabel,
  IonCardSubtitle,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonAlert,
  IonToast,
} from '@ionic/react';
import { expandOutline, trash } from 'ionicons/icons';

interface RecordItemProps {
  id: string;
  type: string;
  amount: string;
}

const RecordItem: React.FC<RecordItemProps> = ({ id, type, amount }) => {
  const [startedDeleting, setStartedDeleting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const startDeleteHandler = () => {
    setStartedDeleting(true);
    slidingOptionsRef.current?.closeOpened();
  };
  const deleteRecordHandler = (id: string) => {
    console.log(id);
    setToastMessage('Record removed');
  };

  return (
    <React.Fragment>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setToastMessage('')}
      />
      <IonAlert
        isOpen={startedDeleting}
        header='Delete this record?'
        message='This can not be undone'
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => setStartedDeleting(false),
          },
          {
            text: 'Yes',
            handler: () => deleteRecordHandler(id),
          },
        ]}
      />
      <IonItemSliding ref={slidingOptionsRef}>
        <IonItemOptions>
          <IonItemOption color='danger' onClick={startDeleteHandler}>
            <IonIcon slot='icon-only' icon={trash} />
          </IonItemOption>
        </IonItemOptions>
        <IonItem routerLink={`/records/${id}`} lines='full' button>
          <IonGrid>
            <IonRow>
              <IonCol size='2'>
                <IonIcon icon={expandOutline} />
              </IonCol>
              <IonCol size='6'>
                <IonLabel>Category </IonLabel>
              </IonCol>
              <IonCol size='4' className='ion-text-right'>
                <IonLabel>
                  {type === 'expence' ? `-${amount}` : amount}$
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='4' offset='2'>
                <IonCardSubtitle>Cash</IonCardSubtitle>
              </IonCol>
              <IonCol size='6' className='ion-text-right'>
                <IonCardSubtitle>Date</IonCardSubtitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonItemSliding>
    </React.Fragment>
  );
};

export default RecordItem;
