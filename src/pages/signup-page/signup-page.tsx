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
import { signup } from '../../redux/auth/auth.actions';

interface Props {
  signup: (email: string, password: string) => void;
}

const SignupPage: React.FC<Props> = ({ signup }) => {
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

    console.log(email, password);

    signup(email.toString().trim(), password.toString());
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
        <IonButton onClick={signUpHandler} expand='block'>
          Sign Up
        </IonButton>
      </IonGrid>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signup: (email: string, password: string) =>
    dispatch(signup(email, password)),
});

export default connect(null, mapDispatchToProps)(SignupPage);
