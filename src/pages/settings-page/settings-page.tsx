import React from 'react';

import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonRow,
  IonButton,
  IonList,
  IonCard,
} from '@ionic/react';

import Header from '../../components/header/header';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <Header title='Settings' menu={true} />
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>New Email Adress</IonLabel>
            <IonInput value='' type='text' />
          </IonItem>
          <IonButton expand='full'>Update Email</IonButton>
          <IonItem>
            <IonLabel position='floating'>Old Password</IonLabel>
            <IonInput value='' type='text' />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>New Password</IonLabel>
            <IonInput value='' type='text' />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Confirm New Password</IonLabel>
            <IonInput value='' type='text' />
          </IonItem>
          <IonButton expand='full'>Update Password</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
