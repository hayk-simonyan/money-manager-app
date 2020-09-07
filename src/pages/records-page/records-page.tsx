import React, { useState, useEffect } from 'react';

import { IonAlert, IonPage, IonContent, IonList, IonLabel } from '@ionic/react';

import Header from '../../components/header/header';
import RecordItem from './record-item/record-item';

import AddButton from '../../components/add-button/add-button';

import { connect } from 'react-redux';
import { getRecords } from '../../redux/records/record.actions';
import MonthPicker from '../../containers/month-picker/month-picker';
import ChartRecords from '../../containers/chart-records/chart-records';

interface Props {
  records: { records: any; loading: boolean };
  getRecords: (year?: string, month?: string) => void;
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

const RecordsPage: React.FC<Props> = ({ records, getRecords }) => {
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
      <ChartRecords records={records} />
      <IonContent>
        {!records.records ? (
          <IonLabel>No records yet!</IonLabel>
        ) : (
          <IonList>
            {records.records.map((record: Record) => (
              <RecordItem key={record._id} record={record} />
            ))}
          </IonList>
        )}
        <AddButton url='/records/new' />
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getRecords: (year?: string, month?: string) =>
    dispatch(getRecords(year, month)),
});

const mapStateToProps = (state: any) => ({
  records: state.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage);
