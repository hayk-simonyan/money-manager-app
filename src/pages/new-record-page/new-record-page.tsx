import React, { useRef, useState } from 'react';

import {
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonAlert,
  IonPage,
} from '@ionic/react';

import HeaderRecords from '../../components/header-records/header-records';
import SubmitButton from '../../components/submit-button/submit-button';

const NewRecordPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>();
  const [error, setError] = useState<string>();

  const dollarInputRef = useRef<HTMLIonInputElement>(null);
  const categoryInputRef = useRef<HTMLIonInputElement>(null);

  const addRecordHandler = () => {
    const dollar = dollarInputRef.current!.value;
    const category = categoryInputRef.current!.value;

    if (!dollar || !category || +dollar <= 0) {
      setError('Please enter a valid record');
      return;
    }

    setRecords([dollar, category]);
  };

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
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>$</IonLabel>
              <IonInput ref={dollarInputRef} type='number'></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Category</IonLabel>
              <IonInput ref={categoryInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={addRecordHandler} />
    </IonPage>
  );
};

export default NewRecordPage;
