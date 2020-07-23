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

import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';

const NewRecordPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>();
  const [error, setError] = useState<string>();

  const [type, setType] = useState<string>('expences');
  const [account, setAccount] = useState<string>('cash');
  const [category, setCategory] = useState<string>('');
  const dateInputRef = useRef<HTMLIonInputElement>(null);
  const amountInputRef = useRef<HTMLIonInputElement>(null);
  const noteInputRef = useRef<HTMLIonInputElement>(null);

  const addRecordHandler = () => {
    // const recordType = recordTypeInputRef.current!.value;
    // const category = categoryInputRef.current!.value;
    const date = dateInputRef.current!.value;
    const amount = amountInputRef.current!.value;
    const note = noteInputRef.current!.value;

    if (!type || !account || !category || !date || !amount) {
      setError('Please fill out all required inputs');
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
      <Header title='Add Record' menu={false} />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Type</IonLabel>
              <IonSelect
                value={type}
                onIonChange={(e) => setType(e.detail.value)}
              >
                <IonSelectOption value='expences'>Expence</IonSelectOption>
                <IonSelectOption value='incomes'>Income</IonSelectOption>
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
              <IonInput
                autocomplete='on'
                autocorrect='on'
                ref={dateInputRef}
                type='date'
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Amount</IonLabel>
              <IonInput
                // placeholder={type === 'expence' ? '-0' : '+0'}
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
