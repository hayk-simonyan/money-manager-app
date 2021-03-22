import React, { useRef, useState } from 'react';

import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonList,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

import { connect } from 'react-redux';
import { putEmail, putPassword } from '../../redux/auth/auth.actions';

import Header from '../../components/header/header';
import { setAlert } from '../../redux/alerts/alert.actions';
import AddButton from '../../components/add-button/add-button';
import currencies from './currencies.json';

interface Props {
  auth: {
    user: { email: string };
  };
  putEmail: (email: string) => void;
  putPassword: (oldPassword: string, password: string) => void;
  setAlert: (msg: string, alertType: string) => void;
}

const SettingsPage: React.FC<Props> = ({
  auth: {
    user: { email },
  },
  putEmail,
  putPassword,
  setAlert,
}) => {
  const [currency, setCurrency] = useState<string>(
    localStorage.getItem('currency') || '$'
  );

  const [emailFromState, setEmailFromState] = useState<string>(email);
  const emailInputRef = useRef<HTMLIonInputElement>(null);

  const oldPasswordInputRef = useRef<HTMLIonInputElement>(null);
  const newPasswordInputRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLIonInputElement>(null);

  const updateEmailHandler = (e: any) => {
    const email = emailInputRef.current!.value;

    if (!email) return setAlert('Email can not be empty', 'danger');

    putEmail(email!.toString());
    setEmailFromState(email.toString());
    emailInputRef.current!.value = null;
  };

  const updatePasswordHandler = (e: any) => {
    const oldPassword = oldPasswordInputRef.current!.value!.toString();
    const password = newPasswordInputRef.current!.value!.toString();
    const confirmPassword = confirmPasswordInputRef.current!.value!.toString();

    if (!oldPassword)
      return setAlert('Old password can not be empty', 'danger');
    if (!password) return setAlert('New password can not be empty', 'danger');
    if (!confirmPassword)
      return setAlert('Please confirm new password', 'danger');
    if (password !== confirmPassword)
      return setAlert('Passwords do not match', 'danger');

    putPassword(oldPassword, password);
    oldPasswordInputRef.current!.value = null;
    newPasswordInputRef.current!.value = null;
    confirmPasswordInputRef.current!.value = null;
  };

  return (
    <IonPage>
      <Header title='Settings' menu={true} />
      <IonContent>
        <IonList style={{ paddingBottom: '3.7rem' }}>
          <IonCard>
            <IonCardHeader>
              <IonItem>
                <IonCardTitle>CURRENCY</IonCardTitle>
              </IonItem>
            </IonCardHeader>
            <IonCardContent>
              <IonSelect
                value={currency}
                interface='action-sheet'
                onIonChange={(e: any) => {
                  setCurrency(e.detail.value);
                  localStorage.setItem('currency', e.detail.value);
                  window.location.reload(false);
                  setAlert('Currency Updated', 'success');
                }}
              >
                {currencies.map((currency) => (
                  <IonSelectOption key={currency.code} value={currency.symbol}>
                    {currency.name} {`(${currency.symbol})`}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonItem>
                <IonCardTitle>UPDATE EMAIL</IonCardTitle>
              </IonItem>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines='none'>
                <IonText color='medium'>
                  Current Email Address: {emailFromState}
                </IonText>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>New E-mail Adress</IonLabel>
                <IonInput
                  ref={emailInputRef}
                  type='email'
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
                />
              </IonItem>
              <IonButton
                onClick={updateEmailHandler}
                color='tertiary'
                expand='full'
              >
                Update Email
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonItem>
                <IonCardTitle>UPDATE PASSWORD</IonCardTitle>
              </IonItem>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position='floating'>Old Password</IonLabel>
                <IonInput
                  ref={oldPasswordInputRef}
                  type='password'
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
                />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>New Password</IonLabel>
                <IonInput
                  ref={newPasswordInputRef}
                  type='password'
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
                />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Confirm New Password</IonLabel>
                <IonInput
                  ref={confirmPasswordInputRef}
                  type='password'
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
                />
              </IonItem>
              <IonButton
                onClick={updatePasswordHandler}
                color='tertiary'
                expand='full'
              >
                Update Password
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonList>
      </IonContent>

      <AddButton url='/records/new' />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putEmail: (email: string) => dispatch(putEmail(email)),
  putPassword: (oldPassword: string, password: string) =>
    dispatch(putPassword(oldPassword, password)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
