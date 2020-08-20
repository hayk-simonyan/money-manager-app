import React, { useState, useEffect } from 'react';

import { IonContent, IonPage } from '@ionic/react';

import Header from '../../components/header/header';
import AddButton from '../../components/add-button/add-button';
import Accounts from '../../containers/accounts/accounts';
import MonthlyRecords from '../../containers/monthly-records/monthly-records';
import Chart from '../../containers/chart/chart';
import HomepageControls from '../../components/homepage-controls/homepage-controls';

import { connect } from 'react-redux';
import { getRecords } from '../../redux/records/record.actions';

interface Props {
  getRecords: () => void;
  records: {
    records: any;
    incomes: number;
    expences: number;
    recordsByCategories: any;
    cashflow: any;
  };
  accounts: {
    accounts: any;
  };
}

const Homepage: React.FC<Props> = ({ getRecords, records, accounts }) => {
  useEffect(() => {
    getRecords();
  }, []);

  const [segment, setSegment] = useState<'main' | 'chart'>('main');

  return (
    <IonPage>
      <Header title='Home' menu={true} />
      <IonContent>
        <HomepageControls
          segmentValue={segment}
          segmentChangeHandler={(e) => setSegment(e)}
        />
        {segment === 'main' ? (
          <React.Fragment>
            <Accounts />
            <MonthlyRecords />
          </React.Fragment>
        ) : (
          <Chart accounts={accounts} records={records} />
        )}
      </IonContent>
      <AddButton url='/records/new' />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getRecords: () => dispatch(getRecords()),
});

const mapStateToProps = (state: any) => ({
  records: state.records,
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
