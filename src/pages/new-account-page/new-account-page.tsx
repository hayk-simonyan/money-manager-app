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

const NewAccountPage: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>();
  const [error, setError] = useState<string>();

  const [icon, setIcon] = useState<string>();
  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const totalInputRef = useRef<HTMLIonInputElement>(null);

  const addAccountHandler = () => {
    const name = nameInputRef.current!.value;
    const total = totalInputRef.current!.value;

    if (!icon || !name) {
      setError('Please set an account icon and name');
      return;
    }

    setAccounts([name, total]);
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
              <IonLabel position='floating'>Icon</IonLabel>
              <IonSelect
                value={icon}
                cancelText='Cancel'
                okText='Ok'
                onIonChange={(e) => setIcon(e.detail.value)}
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
              <IonLabel position='floating'>Account Name</IonLabel>
              <IonInput ref={nameInputRef} type='text' />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Initial Amount</IonLabel>
              <IonInput ref={totalInputRef} type='number'></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={addAccountHandler} />
    </IonPage>
  );
};

export default NewAccountPage;
