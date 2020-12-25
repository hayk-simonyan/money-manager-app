import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAccounts } from '../../redux/accounts/account.actions';

import {
  IonGrid,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
} from '@ionic/react';

import AccountItem from './account-item/account-item';
import AddAccountButton from './add-account-button/add-account-button';
import AccountsSkeleton from './accounts-skeleton/accounts-skeleton';
import './accounts.css';

interface Props {
  accounts: { accounts: any; loading: boolean };
  getAccounts: () => void;
}

const Accounts: React.FC<Props> = ({
  accounts: { accounts, loading },
  getAccounts,
}) => {
  useEffect(() => {
    getAccounts();
  }, []);

  const fetchedAccounts = accounts.map(
    (account: { _id: string; type: string; name: string; total: number }) => (
      <AccountItem
        key={account._id}
        id={account._id}
        type={account.type}
        name={account.name}
        total={account.total}
      />
    )
  );

  return (
    <IonCard className='accounts-wrapper'>
      <IonCardHeader color='default'>
        <IonRow>
          <IonCol size='9'>
            <IonCardTitle>Accounts</IonCardTitle>
          </IonCol>
          <IonCol size='3' style={{ padding: 0 }}>
            <AddAccountButton />
          </IonCol>
        </IonRow>
      </IonCardHeader>
      {
        <IonGrid style={{ padding: 0 }}>
          <IonRow>{loading ? <AccountsSkeleton /> : fetchedAccounts}</IonRow>
        </IonGrid>
      }
    </IonCard>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getAccounts: () => dispatch(getAccounts()),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
