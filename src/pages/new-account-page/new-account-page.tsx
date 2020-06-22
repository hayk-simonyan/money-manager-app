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

import { connect } from 'react-redux';
import { postAccount } from '../../redux/accounts/account.actions';

interface NewAccountPageProps {
  postAccount: (formData: FormData) => void;
}

const NewAccountPage: React.FC<NewAccountPageProps> = ({ postAccount }) => {
  const [error, setError] = useState<string>();

  const [icon, setIcon] = useState<string>();
  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const totalInputRef = useRef<HTMLIonInputElement>(null);

  const addAccountHandler = () => {
    const name = nameInputRef.current!.value;
    let total = totalInputRef.current?.value;

    if (!icon || !name || name.toString().trim().length === 0) {
      setError('Please set an account icon and name');
      return;
    }
    if (!total) total = 0;

    const formData: FormData = new FormData();
    formData.append('icon', icon.toString());
    formData.append('name', name.toString().trim());
    formData.append('total', total.toString().trim());

    postAccount(formData);
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

const mapDispatchToProps = (dispatch: any) => ({
  postAccount: (formData: FormData) => dispatch(postAccount(formData)),
});

export default connect(null, mapDispatchToProps)(NewAccountPage);
