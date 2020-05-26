import React, { useState } from 'react';

import {
  IonGrid,
  IonAlert,
  IonPage,
  IonContent,
  IonCard,
  IonText,
  IonCardContent,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { DUMMY_RECORDS } from '../../data/dummy-records';

import HeaderRecords from '../../components/header-records/header-records';

const RecordPage: React.FC = () => {
  const [error, setError] = useState<string>();

  const recordId = useParams<{ recordId: string }>().recordId;
  const record = DUMMY_RECORDS.find((record) => record.id === recordId);

  const clearError = () => {
    setError('');
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <HeaderRecords />
      <IonContent>
        <IonGrid>
          <IonCard>
            <IonCardContent>
              <IonText>{record ? record.type : '-'}</IonText>
              <IonText>{record ? record.amount : '-'}</IonText>
            </IonCardContent>
          </IonCard>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RecordPage;
