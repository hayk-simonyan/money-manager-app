import React, { useState } from 'react';

import {
  IonAlert,
  IonPage,
  IonContent,
  IonList,
  IonLabel,
  IonListHeader,
} from '@ionic/react';
import { connect } from 'react-redux';

import Header from '../../components/header/header';
import RecordItem from './record-item/record-item';
import AddButton from '../../components/add-button/add-button';
import MonthPicker from '../../containers/month-picker/month-picker';
import ChartRecords from '../../containers/chart-records/chart-records';

interface Props {
  records: { records: any; loading: boolean };
}

interface Record {
  _id: string;
  type: string;
  account: string;
  category: string;
  date: Date;
  amount: number;
  note: string;
}

const RecordsPage: React.FC<Props> = ({ records }) => {
  const [error, setError] = useState<string>();

  const clearError = () => {
    setError('');
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <Header title='Records' menu={true} />
      <MonthPicker />
      <IonContent>
        <ChartRecords records={records} />
        {!records.records ? (
          <IonLabel>No records yet!</IonLabel>
        ) : (
          <IonList style={{ paddingBottom: '3.7rem' }}>
            <IonListHeader>All Records</IonListHeader>
            {records.records.map((record: Record, index: any) => (
              <RecordItem key={record._id} record={record} />
            ))}
          </IonList>
        )}
        <AddButton url='/records/new' />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => ({
  records: state.records,
});

export default connect(mapStateToProps)(RecordsPage);
