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
  IonContent,
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
      <Header title='New Account' menu={false} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>Account Name</IonLabel>
                <IonInput ref={nameInputRef} type='text' required />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Initial Amount</IonLabel>
                <IonInput ref={totalInputRef} type='number' required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Account Type</IonLabel>
                <IonSelect
                  interface='action-sheet'
                  value={icon}
                  cancelText='Cancel'
                  okText='Ok'
                  onIonChange={(e) => setIcon(e.detail.value)}
                >
                  <IonSelectOption value='general'>General</IonSelectOption>
                  <IonSelectOption value='cash'>Cash</IonSelectOption>
                  <IonSelectOption value='creditcard'>
                    Credit Card
                  </IonSelectOption>
                  <IonSelectOption value='savingaccount'>
                    Saving account
                  </IonSelectOption>
                  <IonSelectOption value='insurance'>Insurance</IonSelectOption>
                  <IonSelectOption value='investment'>
                    Investment
                  </IonSelectOption>
                  <IonSelectOption value='mortgage'>Mortgage</IonSelectOption>
                  <IonSelectOption value='loan'>Loan</IonSelectOption>
                  <IonSelectOption value='other'>Other</IonSelectOption>
                </IonSelect>
              </IonItem>
              {/* <IonItem>
                <IonLabel position='floating'>Bank Account Number</IonLabel>
                <IonInput ref={nameInputRef} type='text' required />
              </IonItem> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
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
