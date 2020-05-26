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
import { trendingDownOutline, trendingUpOutline } from 'ionicons/icons';

import Homepage from './pages/homepage/homepage';
import RecordPage from './pages/recordpage/recordpage';

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
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/records' component={RecordPage} />
          <Redirect to='/' />
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='/' href='/'>
            <IonIcon icon={trendingDownOutline} />
            <IonLabel>Expence</IonLabel>
          </IonTabButton>
          <IonTabButton tab='/records' href='/records'>
            <IonIcon icon={trendingUpOutline} />
            <IonLabel>Income</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
