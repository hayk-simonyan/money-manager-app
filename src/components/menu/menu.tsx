import React, { useState } from 'react';
import {
  IonAlert,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
} from '@ionic/react';
import {
  walletOutline,
  listOutline,
  informationCircleOutline,
  appsOutline,
  settingsOutline,
  logOutOutline,
} from 'ionicons/icons';
import { connect } from 'react-redux';

import { logout } from '../../redux/auth/auth.actions';

interface Props {
  logout: () => void;
  auth: {
    isAuthenticated: any;
    loading: boolean;
  };
}

const Menu: React.FC<Props> = ({
  logout,
  auth: { isAuthenticated, loading },
}) => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <IonMenu contentId="main" side="start" menuId="id">
      <IonAlert
        isOpen={showAbout}
        onDidDismiss={() => setShowAbout(false)}
        header={'Money Manager'}
        subHeader={'Version 1.3'}
        message={`
          <p>Uncomplicated Money Manager</p>
          <p>Expense and Income Tracker</p>
          <p>Without limitation Features, Free</p>
          <p>Financial Planning and Review</p>
          <p>Detailed Analysis</p>
          <p>Easy to Use</p>
          `}
        buttons={['Close']}
      />

      <IonHeader>
        <IonToolbar color="primary">
          <IonItem routerLink="/" color="primary" lines="none" button>
            <IonTitle>Money Manager</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem lines="full" button routerLink="/" routerDirection="none">
              <IonIcon slot="start" icon={walletOutline} />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              lines="full"
              button
              routerLink="/records"
              routerDirection="none"
            >
              <IonIcon slot="start" icon={listOutline} />
              <IonLabel>Records</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              lines="full"
              button
              routerLink="/categories"
              routerDirection="none"
            >
              <IonIcon slot="start" icon={appsOutline} />
              <IonLabel>Categories</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              lines="full"
              button
              routerLink="/settings"
              routerDirection="none"
            >
              <IonIcon slot="start" icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {/* <IonMenuToggle>
            <IonItem
              lines='full'
              button
              routerLink='/export'
              routerDirection='none'
            >
              <IonIcon slot='start' icon={exitOutline} />
              <IonLabel>Export</IonLabel>
            </IonItem>
          </IonMenuToggle> */}
          <IonMenuToggle>
            <IonItem
              lines="full"
              button
              onClick={(e) => setShowAbout(true)}
              // routerLink='/about'
              routerDirection="none"
            >
              <IonIcon slot="start" icon={informationCircleOutline} />
              <IonLabel>About</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {isAuthenticated && (
            <IonMenuToggle>
              <IonItem
                onClick={logout}
                lines="full"
                button
                routerLink="/signin"
                routerDirection="none"
              >
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout()),
});

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
