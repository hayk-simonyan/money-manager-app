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
  IonSpinner,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { trashOutline, checkmarkOutline } from 'ionicons/icons';

import Header from '../../components/header/header';

import { connect } from 'react-redux';
import {
  putAccount,
  deleteAccount,
  getAccounts,
} from '../../redux/accounts/account.actions';
import { setAlert } from '../../redux/alerts/alert.actions';

interface Account {
  _id: string;
  icon: string;
  name: string;
  total: string;
}

interface Props {
  accounts: { accounts: any; loading: boolean };
  putAccount: (id: string, icon: string, name: string, total: string) => void;
  deleteAccount: (id: string) => void;
  getAccounts: () => void;
  setAlert: (msg: string, alertType: string) => void;
}

const EditAccountPage: React.FC<Props> = ({
  accounts: { accounts, loading },
  putAccount,
  deleteAccount,
  getAccounts,
  setAlert,
}) => {
  const history = useHistory();
  const [error, setError] = useState<string>();
  const clearError = () => {
    setError('');
  };

  const { id } = useParams();
  const currentAccount = accounts.find((a: Account) => a._id === id);

  const [icon, setIcon] = useState<string>(currentAccount.icon);
  const nameInputRef = useRef<HTMLIonInputElement>(currentAccount.name);
  const [name, setName] = useState<string>(currentAccount.name);
  const totalInputRef = useRef<HTMLIonInputElement>(currentAccount.total);
  const [total, setTotal] = useState<number>(currentAccount.total);
  // const [name, setName] = useState<string>(currentAccount.name);
  // let [total, setTotal] = useState<string>(currentAccount.total);

  const updateAccountHandler = () => {
    const name = nameInputRef.current!.value;
    const total = totalInputRef.current!.value;

    if (!icon || !name || !total) {
      setError('Please fill out all fields');
      return;
    }

    putAccount(id, icon.toString(), name.toString(), total.toString());
    setAlert('Account Was Updated', 'success');
    history.push('/');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteAccountHandler = () => {
    deleteAccount(id);
    getAccounts();
    setAlert('Account Was Removed', 'success');
    history.push('/');
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const clearModal = () => {
    setIsOpen(false);
  };

  return loading ? (
    <IonSpinner />
  ) : (
    <IonPage>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <IonAlert
        isOpen={isOpen}
        message='Are you sure? This will also remove all the records related to this account'
        buttons={[
          { text: 'No', handler: clearModal },
          { text: 'Yes', handler: deleteAccountHandler },
        ]}
      />
      <Header title='Accounts' menu={false} />
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
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='4'>
            <IonButton onClick={openModal} color='light'>
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
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putAccount: (id: string, icon: string, name: string, total: string) =>
    dispatch(putAccount(id, icon, name, total)),
  deleteAccount: (id: string) => dispatch(deleteAccount(id)),
  getAccounts: () => dispatch(getAccounts()),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountPage);
