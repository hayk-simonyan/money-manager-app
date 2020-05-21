import React, { useRef, useState } from 'react';

import {
  IonApp,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonAlert,
} from '@ionic/react';
import { add } from 'ionicons/icons';

import Header from '../../components/header/header';
import AddButton from '../../components/add-button/add-button';

const RecordPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>();
  const [error, setError] = useState<string>();

  const dollarInputRef = useRef<HTMLIonInputElement>(null);
  const categoryInputRef = useRef<HTMLIonInputElement>(null);

  const addRecordHandler = () => {
    const dollar = dollarInputRef.current!.value;
    const category = categoryInputRef.current!.value;

    if (!dollar || !category || +dollar <= 0) {
      setError('Please enter a valid record');
      return;
    }

    setRecords([dollar, category]);
  };

  const clearError = () => {
    setError('');
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <IonApp>
        <Header />
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>$</IonLabel>
                <IonInput ref={dollarInputRef} type='number'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Category</IonLabel>
                <IonInput ref={categoryInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonCard>
            <IonCardContent>
              <h2>{records}</h2>
            </IonCardContent>
          </IonCard>
        </IonGrid>
        <AddButton onClickHandler={addRecordHandler} />
        {/* <IonFab
        style={{
          pposition: 'fixed',
          bottom: '10px',
          right: '10px',
        }}
      >
        <IonFabButton onClick={addRecordHandler}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab> */}
      </IonApp>
    </React.Fragment>
  );
};

export default RecordPage;
