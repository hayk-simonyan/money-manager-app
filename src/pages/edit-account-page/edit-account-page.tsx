import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

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

interface Props {
  putAccount: (id: string, type: string, name: string, total: string) => void;
  deleteAccount: (id: string) => void;
}

const EditAccountPage: React.FC<Props> = ({ putAccount, deleteAccount }) => {
  const history = useHistory();
  const [error, setError] = useState<string>();
  const clearError = () => {
    setError('');
  };

  // @ts-ignore
  const { id } = useParams();
  const location: any = useLocation();
  const findAccount: any = location.state;
  const currentAccount = { ...findAccount };

  const [type, setType] = useState<HTMLIonSelectElement>(currentAccount.type);
  const nameInputRef = useRef<HTMLIonInputElement>(currentAccount.name);
  const totalInputRef = useRef<HTMLIonInputElement>(currentAccount.total);

  const [name, setName] = useState<string>(currentAccount.name);
  const [total, setTotal] = useState<number>(currentAccount.total);

  // update state if location.state is changed
  useEffect(() => {
    setType(currentAccount.type);

    setName(currentAccount.name);
    setTotal(currentAccount.total);
  }, [location.state]);

  const updateAccountHandler = () => {
    const name = nameInputRef.current!.value;
    const total = totalInputRef.current!.value;

    if (!type || !name || !total) {
      setError('Please fill out all fields');
      return;
    }

    putAccount(id, type.toString(), name.toString(), total.toString());
    history.push('/');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteAccountHandler = async () => {
    history.push('/');
    deleteAccount(id);
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
                <IonLabel position='floating'>Account Label</IonLabel>
                <IonInput
                  value={name}
                  ref={nameInputRef}
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
                />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Initial Amount</IonLabel>
                <IonInput
                  value={total}
                  ref={totalInputRef}
                  type='number'
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
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
});

export default connect(null, mapDispatchToProps)(EditAccountPage);
