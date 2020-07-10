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
  IonButton,
} from '@ionic/react';

import Header from '../../components/header/header';

import { connect } from 'react-redux';
import { signin } from '../../redux/auth/auth.actions';
import { Redirect } from 'react-router-dom';

interface Props {
  signin: (email: string, password: string) => void;
  auth: {
    isAuthenticated: any;
    loading: boolean;
  };
}

const SigninPage: React.FC<Props> = ({
  signin,
  auth: { isAuthenticated, loading },
}) => {
  const [error, setError] = useState<string>();

  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const signInHandler = () => {
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    if (
      !email ||
      !password ||
      email.toString().trim().length === 0 ||
      password.toString().length === 0
    ) {
      setError('Please provide required inputs');
      return;
    }

    signin(email.toString().trim(), password.toString());
  };

  const clearError = () => {
    setError('');
  };

  return isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <IonPage>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <Header />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput ref={emailInputRef} type='text' />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Password</IonLabel>
              <IonInput ref={passwordInputRef} type='password'></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonButton onClick={signInHandler} expand='block'>
          Sign In
        </IonButton>
        <IonItem lines='none'>
          <IonLabel>Create account? </IonLabel>
          <IonButton color='success' routerLink='/signup' expand='block'>
            Sign Up
          </IonButton>
        </IonItem>
      </IonGrid>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signin: (email: string, password: string) =>
    dispatch(signin(email, password)),
});

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
