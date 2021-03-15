import React, { useEffect, useRef, useState } from 'react';
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
  IonContent,
} from '@ionic/react';
import { connect } from 'react-redux';

import Header from '../../components/header/header';
import { signup, loadUser } from '../../redux/auth/auth.actions';
import { Redirect } from 'react-router-dom';

import './signup-page.css';

interface Props {
  signup: (name: string, email: string, password: string) => void;
  loadUser: () => void;
  auth: {
    isAuthenticated: any;
    loading: boolean;
  };
}

const SignupPage: React.FC<Props> = ({
  signup,
  loadUser,
  auth: { isAuthenticated, loading },
}) => {
  const [error, setError] = useState<string>();

  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const signUpHandler = () => {
    const name = nameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    if (
      !name ||
      !email ||
      !password ||
      email.toString().trim().length === 0 ||
      password.toString().length === 0
    ) {
      setError('Please provide required inputs');
      return;
    }

    signup(name.toString(), email.toString().trim(), password.toString());
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
      <Header title='Create Your Account' menu={true} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>Full Name</IonLabel>
                <IonInput ref={nameInputRef} autocomplete='off' />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Email</IonLabel>
                <IonInput ref={emailInputRef} type='email' />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Password</IonLabel>
                <IonInput ref={passwordInputRef} type='password'></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonButton onClick={signUpHandler} expand='block' color='tertiary'>
            Sign Up
          </IonButton>
          <IonItem lines='none'>
            <IonGrid>
              <IonRow>
                <IonCol size='6' className='container'>
                  <IonLabel className='vertical-center'>
                    Have an account?
                  </IonLabel>
                </IonCol>
                <IonCol size='6'>
                  <IonButton color='light' routerLink='/signin' expand='block'>
                    Sign In
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signup: (name: string, email: string, password: string) =>
    dispatch(signup(name, email, password)),
  loadUser: () => dispatch(loadUser()),
});

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
