import React, { useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/react';
import { trashOutline, checkmarkOutline } from 'ionicons/icons';

import Header from '../../components/header/header';

import { connect } from 'react-redux';
import {
  putAccount,
  deleteAccount,
} from '../../redux/accounts/account.actions';
import { setAlert } from '../../redux/alerts/alert.actions';

interface Account {
  _id: string;
  type: string;
  name: string;
  total: string;
}

interface Props {
  accounts: { accounts: any; loading: boolean };
  putAccount: (id: string, type: string, name: string, total: string) => void;
  deleteAccount: (id: string) => void;
  setAlert: (msg: string, alertType: string) => void;
}

const EditAccountPage: React.FC<Props> = ({
  accounts: { accounts, loading },
  putAccount,
  deleteAccount,
  setAlert,
}) => {
  const history = useHistory();
  const [error, setError] = useState<string>();
  const clearError = () => {
    setError('');
  };

  //@ts-ignore
  const { id } = useParams();
  const findAccount = accounts.find((a: Account) => a._id === id);
  const currentAccount = { ...findAccount };

  const [type, setType] = useState<string>(currentAccount.icon);
  const nameInputRef = useRef<HTMLIonInputElement>(currentAccount.name);
  const [name, setName] = useState<string>(currentAccount.name);
  const totalInputRef = useRef<HTMLIonInputElement>(currentAccount.total);
  const [total, setTotal] = useState<number>(currentAccount.total);
  // const [name, setName] = useState<string>(currentAccount.name);
  // let [total, setTotal] = useState<string>(currentAccount.total);

  const updateAccountHandler = () => {
    const name = nameInputRef.current!.value;
    const total = totalInputRef.current!.value;

    if (!type || !name || !total) {
      setError('Please fill out all fields');
      return;
    }

    putAccount(id, type.toString(), name.toString(), total.toString());
    setAlert('Account Was Updated', 'success');
    history.push('/');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteAccountHandler = async () => {
    console.log('deleteaccounthandlercalled');
    history.push('/');
    deleteAccount(id);
    setAlert('Account Was Removed', 'success');
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={isOpen}
        message='Are you sure? This will also remove all the records related to this account'
        buttons={[
          { text: 'No', handler: toggleModal },
          { text: 'Yes', handler: deleteAccountHandler },
        ]}
      />
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <Header title='Accounts' menu={false} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>Account Name</IonLabel>
                <IonInput value={name} ref={nameInputRef} type='text' />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Initial Amount</IonLabel>
                <IonInput
                  value={total}
                  ref={totalInputRef}
                  type='number'
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position='floating'>Account Type</IonLabel>
                <IonSelect
                  interface='action-sheet'
                  value={type}
                  cancelText='Cancel'
                  okText='Ok'
                  onIonChange={(e) => setType(e.detail.value)}
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
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='2' offset='2'>
              <IonButton onClick={toggleModal} color='tertiary'>
                <IonIcon icon={trashOutline} slot='icon-only' />
              </IonButton>
            </IonCol>
            <IonCol size='4' offset='4'>
              <IonButton onClick={updateAccountHandler} color='primary'>
                <IonIcon icon={checkmarkOutline} slot='icon-only' />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putAccount: (id: string, icon: string, name: string, total: string) =>
    dispatch(putAccount(id, icon, name, total)),
  deleteAccount: (id: string) => dispatch(deleteAccount(id)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountPage);
