import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';

import Header from '../../components/header/header';

import { connect } from 'react-redux';
import { postAccount } from '../../redux/accounts/account.actions';
import { setAlert } from '../../redux/alerts/alert.actions';
import { checkmarkOutline } from 'ionicons/icons';

interface Props {
  postAccount: (icon: string, name: string, total: string) => void;
  setAlert: (msg: string, alertType: string) => void;
}

const NewAccountPage: React.FC<Props> = ({ postAccount, setAlert }) => {
  const history = useHistory();
  const [error, setError] = useState<string>();

  const [icon, setIcon] = useState<string>();
  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const totalInputRef = useRef<HTMLIonInputElement>(null);

  const addAccountHandler = () => {
    const name = nameInputRef.current!.value;
    let total = totalInputRef.current!.value;

    if (!icon || !name || !total) {
      setError('Please fill out all fields');
      return;
    }

    // const formData: FormData = new FormData();
    // formData.append('icon', icon.toString());
    // formData.append('name', name.toString().trim());
    // formData.append('total', total.toString().trim());

    postAccount(icon.toString(), name.toString(), total.toString());
    setAlert('Account Was Created', 'success');
    history.push('/');
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
      <Header title='Add Account' menu={false} />
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
              <IonInput ref={nameInputRef} type='text' required />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Initial Amount</IonLabel>
              <IonInput ref={totalInputRef} type='number' required></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonFab horizontal='end' vertical='bottom' slot='fixed'>
        <IonFabButton type='submit' onClick={addAccountHandler}>
          <IonIcon icon={checkmarkOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  postAccount: (icon: string, name: string, total: string) =>
    dispatch(postAccount(icon, name, total)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

export default connect(null, mapDispatchToProps)(NewAccountPage);
