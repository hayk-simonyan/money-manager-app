import React from 'react';

import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, cashOutline } from 'ionicons/icons';

import Homepage from './pages/home-page/homepage';
import NewRecordPage from './pages/new-record-page/new-record-page';
import RecordsPage from './pages/records-page/records-page';
import RecordPage from './pages/record-page/record-page';
import AboutPage from './pages/about-page/about-page';
import Menu from './components/menu/menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu />
      {/* <IonTabs> */}
      <IonRouterOutlet id='main'>
        <Route exact path='/home' component={Homepage} />
        <Route exact path='/records/new' component={NewRecordPage} />
        <Route exact path='/records/:recordId' component={RecordPage} />
        <Route exact path='/records' component={RecordsPage} />
        <Route exact path='/about' component={AboutPage} />
        <Redirect to='/home' />
      </IonRouterOutlet>
      {/* <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='records' href='/records'>
            <IonIcon icon={cashOutline} />
            <IonLabel>Records</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
      {/* </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
