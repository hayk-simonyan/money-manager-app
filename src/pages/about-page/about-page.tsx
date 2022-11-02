import React from 'react';

import {
  IonGrid,
  IonPage,
  IonContent,
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
import AddButton from '../../components/add-button/add-button';

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
                <IonCardTitle>Money Manager</IonCardTitle>
                <IonCardSubtitle>
                  Money Manager makes managing Personal Finances easy
                </IonCardSubtitle>
                <IonCardSubtitle>Version 2.1</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList>
                  <IonItem button>
                    <IonLabel>Without limitation Features, Free</IonLabel>
                  </IonItem>
                  <IonItem button>
                    <IonLabel>Financial Planning and Review</IonLabel>
                  </IonItem>
                  <IonItem button>
                    <IonLabel>Cashflow and Balance Trend</IonLabel>
                  </IonItem>
                  <IonItem button>
                    <IonLabel>Expense and Income Tracking</IonLabel>
                  </IonItem>
                  <IonItem button>
                    <IonLabel>Easy to Use</IonLabel>
                  </IonItem>
                  <IonItem button>
                    <IonLabel>Clean User Interface</IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonRow>
        </IonGrid>
      </IonContent>

      <AddButton url='/records/new' />
    </IonPage>
  );
};

export default AboutPage;
