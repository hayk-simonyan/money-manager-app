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
// import { postSignIn } from '../../redux/accounts/account.actions';

interface SigninPageProps {
  postSignIn: (formData: FormData) => void;
}

const SigninPage: React.FC<SigninPageProps> = ({ postSignIn }) => {
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

    const formData: FormData = new FormData();
    formData.append('email', email.toString().trim());
    formData.append('password', password.toString());

    postSignIn(formData);
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
      </IonGrid>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  //   postSignIn: (formData: FormData) => dispatch(postSignIn(formData)),
});

export default connect(null, mapDispatchToProps)(SigninPage);
