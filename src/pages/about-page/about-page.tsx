import React from 'react';

import { IonGrid, IonPage, IonContent } from '@ionic/react';

import Header from '../../components/header/header';

const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid>
          <h1>ABOUT PAGE</h1>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
