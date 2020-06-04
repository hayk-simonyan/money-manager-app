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

  const recordTypeInputRef = useRef<HTMLIonInputElement>(null);
  const categoryInputRef = useRef<HTMLIonInputElement>(null);
  const amountInputRef = useRef<HTMLIonInputElement>(null);
  const dateInputRef = useRef<HTMLIonInputElement>(null);
  const noteInputRef = useRef<HTMLIonInputElement>(null);

  const addRecordHandler = () => {
    const recordType = recordTypeInputRef.current!.value;
    const category = categoryInputRef.current!.value;
    const amount = amountInputRef.current!.value;
    const date = dateInputRef.current!.value;
    const note = noteInputRef.current!.value;

    if (!recordType || !category || !amount || date || !note) {
      setError('Please fill out all inputs');
      return;
    }
    if (+amount <= 0) {
      setError('Amount cant be less or equal to 0');
      return;
    }

    setRecords([amount, category]);
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
              <IonLabel position='floating'>Income/Expence</IonLabel>
              <IonInput ref={recordTypeInputRef} type='text'></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Category</IonLabel>
              <IonInput ref={categoryInputRef} type='number'></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Amount</IonLabel>
              <IonInput ref={amountInputRef} type='number'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput ref={dateInputRef} type='date'></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Note</IonLabel>
              <IonInput ref={noteInputRef} type='text'></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow></IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={addRecordHandler} />
    </IonPage>
  );
};

export default NewRecordPage;
