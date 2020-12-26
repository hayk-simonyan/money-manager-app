import React, { useState } from 'react';
import { IonContent, IonPage, IonLabel, IonList, IonItem } from '@ionic/react';
import { connect } from 'react-redux';

import Header from '../../components/header/header';
import AddButton from '../../components/add-button/add-button';
import Accounts from '../../containers/accounts/accounts';
import MonthlyRecords from '../../containers/monthly-records/monthly-records';
import Chart from '../../containers/chart/chart';
import HomepageControls from '../../components/homepage-controls/homepage-controls';
import RecordItem from '../records-page/record-item/record-item';
import MonthPicker from '../../containers/month-picker/month-picker';

interface Record {
  _id: string;
  type: string;
  account: string;
  category: string;
  date: Date;
  amount: number;
  note: string;
}

interface Props {
  records: {
    records: any;
    incomes: number;
    expences: number;
    recordsByCategories: any;
    cashflow: any;
    loading: boolean;
  };
  accounts: {
    accounts: any;
    loading: boolean;
  };
}

const Homepage: React.FC<Props> = ({ records, accounts }) => {
  const [segment, setSegment] = useState<'charts' | 'records'>('charts');

  return (
    <IonPage>
      <Header title='Home' menu={true} />
      <IonContent>
        <HomepageControls
          segmentValue={segment}
          segmentChangeHandler={(e) => setSegment(e)}
        />
        <MonthPicker />
        {segment === 'charts' ? (
          <React.Fragment>
            <Accounts />
            <Chart accounts={accounts} />
          </React.Fragment>
        ) : (
          <div style={{ paddingBottom: '3.6rem' }}>
            <MonthlyRecords />
            {!records.records.length ? (
              <IonItem lines='full'>
                <IonLabel className='ion-text-center'>
                  No Records found
                </IonLabel>
              </IonItem>
            ) : (
              <IonList>
                {records.records.map((record: Record) => (
                  <RecordItem key={record._id} record={record} />
                ))}
              </IonList>
            )}
          </div>
        )}
      </IonContent>
      <AddButton url='records/new' />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({});

const mapStateToProps = (state: any) => ({
  records: state.records,
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
