import React, { useEffect, useState } from 'react';

import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { Plugins } from '@capacitor/core';

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
import { loadUser } from './redux/auth/auth.actions';
import { Provider } from 'react-redux';
import SettingsPage from './pages/settings-page/settings-page';
import NetworkError from './pages/network-error/network-error';

import store from './redux/store';

import Homepage from './pages/home-page/homepage';
import NewRecordPage from './pages/new-record-page/new-record-page';
import RecordsPage from './pages/records-page/records-page';
import EditRecordPage from './pages/edit-record-page/edit-record-page';
import AboutPage from './pages/about-page/about-page';
import Menu from './components/menu/menu';
import SignupPage from './pages/signup-page/signup-page';
import SigninPage from './pages/signin-page/signin-page';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './containers/private-route/private-route';
import NewAccountPage from './pages/new-account-page/new-account-page';
import EditAccountPage from './pages/edit-account-page/edit-account-page';
import Alert from './containers/alert/alert';
import CategoriesPage from './pages/categories-page/categories-page';
import NewCategoryPage from './pages/new-category-page/new-category-page';
import EditCategoryPage from './pages/edit-category-page/edit-category-page';

import './override.css';

const { Network, StatusBar } = Plugins;

const App: React.FC = () => {
  const [networkState, setNetworkState] = useState<boolean>(true);

  Network.getStatus().then((status) => {
    setNetworkState(status.connected);
  });

  useEffect(() => {
    Network.addListener('networkStatusChange', (status) => {
      window.location.reload(false);
      setNetworkState(status.connected);
    });

    StatusBar.setBackgroundColor({
      color: '#3880FF',
    });

    if (networkState) {
      // @ts-ignore
      store.dispatch(loadUser());
    }

    if (networkState && localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return networkState ? (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <Menu />
          <IonRouterOutlet id="main">
            <PrivateRoute exact path="/" component={Homepage} />

            <PrivateRoute
              exact
              path="/accounts/new"
              component={NewAccountPage}
            />
            <PrivateRoute
              exact
              path="/accounts/:id"
              component={EditAccountPage}
            />

            <PrivateRoute exact path="/categories" component={CategoriesPage} />
            <PrivateRoute
              exact
              path="/categories/new"
              component={NewCategoryPage}
            />
            <PrivateRoute
              exact
              path="/categories/:id"
              component={EditCategoryPage}
            />

            <PrivateRoute exact path="/records" component={RecordsPage} />
            <PrivateRoute exact path="/records/new" component={NewRecordPage} />
            <PrivateRoute
              exact
              path="/records/:id"
              component={EditRecordPage}
            />

            <PrivateRoute exact path="/settings" component={SettingsPage} />

            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/signin" component={SigninPage} />
            <Redirect to="/" />
          </IonRouterOutlet>
        </IonReactRouter>
        <Alert />
      </IonApp>
    </Provider>
  ) : (
    <NetworkError />
  );
};

export default App;
