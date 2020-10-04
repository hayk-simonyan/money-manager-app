import React from 'react';
import {
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
  return (
    <IonMenu contentId='main' side='start' menuId='id'>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonItem routerLink='/settings' color='primary' lines='none' button>
            <IonTitle>Money Manager</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem lines='full' button routerLink='/' routerDirection='none'>
              <IonIcon slot='start' icon={walletOutline} />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              lines='full'
              button
              routerLink='/records'
              routerDirection='none'
            >
              <IonIcon slot='start' icon={listOutline} />
              <IonLabel>Records</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              lines='full'
              button
              routerLink='/categories'
              routerDirection='none'
            >
              <IonIcon slot='start' icon={appsOutline} />
              <IonLabel>Categories</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              lines='full'
              button
              routerLink='/settings'
              routerDirection='none'
            >
              <IonIcon slot='start' icon={settingsOutline} />
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
              lines='full'
              button
              routerLink='/about'
              routerDirection='none'
            >
              <IonIcon slot='start' icon={informationCircleOutline} />
              <IonLabel>About</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {isAuthenticated && (
            <IonMenuToggle>
              <IonItem
                onClick={logout}
                lines='full'
                button
                routerLink='/signin'
                routerDirection='none'
              >
                <IonIcon slot='start' icon={logOutOutline} />
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
