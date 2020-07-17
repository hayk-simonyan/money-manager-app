import React, { useState } from 'react';

import { IonAlert, IonPage, IonContent, IonList } from '@ionic/react';

import Header from '../../components/header/header';
import RecordItem from './record-item/record-item';

import { DUMMY_RECORDS } from '../../data/dummy-records';
import AddButton from '../../components/add-button/add-button';

const RecordsPage: React.FC = () => {
  const [error, setError] = useState<string>();

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
      <Header title='Records' menu={true} />
      <IonContent>
        {DUMMY_RECORDS && (
          <IonList>
            {DUMMY_RECORDS.map((record) => (
              <RecordItem
                key={record.id}
                id={record.id}
                type={record.type}
                amount={record.amount}
              />
            ))}
          </IonList>
        )}
        <AddButton />
      </IonContent>
    </IonPage>
  );
};

export default RecordsPage;
