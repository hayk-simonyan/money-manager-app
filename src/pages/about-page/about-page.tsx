import React from 'react';

import {
  IonGrid,
  IonPage,
  IonContent,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonList,
  IonLabel,
  IonItem,
} from '@ionic/react';

import Header from '../../components/header/header';

const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <Header title='About' menu={true} />
      <IonContent color='light'>
        <IonGrid style={{ height: '100%' }}>
          <IonRow
            className='ion-justify-content-center ion-align-items-center'
            style={{ height: '100%' }}
          >
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Money Manager makes managing Personal Finances easy
                </IonCardTitle>
                <IonCardSubtitle>Version 1.0.0</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonLabel>Without limitation Features, Free</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Financial Planning and Review</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Cashflow and Balance Trend</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Expense and Income Tracking</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Easy to Use</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Clean User Interface</IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
