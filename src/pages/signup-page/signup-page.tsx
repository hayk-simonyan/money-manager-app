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
import { connect } from 'react-redux';

import Header from '../../components/header/header';
import { signup } from '../../redux/auth/auth.actions';
import { Redirect } from 'react-router-dom';

interface Props {
  signup: (email: string, password: string) => void;
  auth: {
    isAuthenticated: any;
    loading: boolean;
  };
}

const SignupPage: React.FC<Props> = ({
  signup,
  auth: { isAuthenticated, loading },
}) => {
  const [error, setError] = useState<string>();

  // const nameInputRef = useRef<HTMLIonInputElement>(null);
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const signUpHandler = () => {
    // const name = nameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    if (
      // !name ||
      !email ||
      !password ||
      email.toString().trim().length === 0 ||
      password.toString().length === 0
    ) {
      setError('Please provide required inputs');
      return;
    }

    signup(email.toString().trim(), password.toString());
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
      <Header title='Money Manager' menu={true} />
      <IonGrid>
        <IonRow>
          <IonCol>
            {/* <IonItem>
              <IonLabel position='floating'>Full Name</IonLabel>
              <IonInput ref={nameInputRef} type='text' />
            </IonItem> */}
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
        <IonButton onClick={signUpHandler} expand='block' color='secondary'>
          Sign Up
        </IonButton>
        <IonItem lines='none'>
          <IonLabel>Have an account? </IonLabel>
          <IonButton color='light' routerLink='/signin' expand='block'>
            Sign In
          </IonButton>
        </IonItem>
      </IonGrid>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signup: (email: string, password: string) =>
    dispatch(signup(email, password)),
});

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
