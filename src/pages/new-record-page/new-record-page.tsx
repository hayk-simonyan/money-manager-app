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
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

import HeaderRecords from '../../components/header-records/header-records';
import SubmitButton from '../../components/submit-button/submit-button';

const NewRecordPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>();
  const [error, setError] = useState<string>();
  console.log(records);

  const [recordType, setRecordType] = useState<string>('expence');
  const [account, setAccount] = useState<string>('cash');
  const [category, setCategory] = useState<string>('');
  // const recordTypeInputRef = useRef<HTMLIonInputElement>(null);
  // const categoryInputRef = useRef<HTMLIonInputElement>(null);
  const amountInputRef = useRef<HTMLIonInputElement>(null);
  const dateInputRef = useRef<HTMLIonInputElement>(null);
  const noteInputRef = useRef<HTMLIonInputElement>(null);

  const addRecordHandler = () => {
    // const recordType = recordTypeInputRef.current!.value;
    // const category = categoryInputRef.current!.value;
    const amount = amountInputRef.current!.value;
    const date = dateInputRef.current!.value;
    const note = noteInputRef.current!.value;

    if (!recordType || !account || !category || !amount || date || !note) {
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
              <IonLabel>Type</IonLabel>
              <IonSelect
                value={recordType}
                onIonChange={(e) => setRecordType(e.detail.value)}
              >
                <IonSelectOption value='expence'>Expence</IonSelectOption>
                <IonSelectOption value='income'>Income</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Account</IonLabel>
              <IonSelect
                value={account}
                onIonChange={(e) => setAccount(e.detail.value)}
              >
                <IonSelectOption value='cash'>Cash</IonSelectOption>
                <IonSelectOption value='savings'>Savings</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Category</IonLabel>
              <IonSelect
                value={category}
                cancelText='Cancel'
                okText='Ok'
                onIonChange={(e) => setCategory(e.detail.value)}
              >
                <IonSelectOption value='bacon'>Bacon</IonSelectOption>
                <IonSelectOption value='olives'>Black Olives</IonSelectOption>
                <IonSelectOption value='xcheese'>Extra Cheese</IonSelectOption>
                <IonSelectOption value='peppers'>Green Peppers</IonSelectOption>
                <IonSelectOption value='mushrooms'>Mushrooms</IonSelectOption>
                <IonSelectOption value='onions'>Onions</IonSelectOption>
                <IonSelectOption value='pepperoni'>Pepperoni</IonSelectOption>
                <IonSelectOption value='pineapple'>Pineapple</IonSelectOption>
                <IonSelectOption value='sausage'>Sausage</IonSelectOption>
                <IonSelectOption value='Spinach'>Spinach</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput ref={dateInputRef} type='date' />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Amount</IonLabel>
              <IonInput
                placeholder={recordType === 'expence' ? '-0' : '+0'}
                ref={amountInputRef}
                type='number'
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Note</IonLabel>
              <IonInput ref={noteInputRef} type='text'></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={addRecordHandler} />
    </IonPage>
  );
};

export default NewRecordPage;
