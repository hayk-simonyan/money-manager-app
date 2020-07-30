import React, { useState, useEffect } from 'react';

import { IonAlert, IonPage, IonContent, IonList } from '@ionic/react';

import Header from '../../components/header/header';
import RecordItem from './record-item/record-item';

import { DUMMY_RECORDS } from '../../data/dummy-records';
import AddButton from '../../components/add-button/add-button';

import { connect } from 'react-redux';
import { getRecords } from '../../redux/records/record.actions';

interface Props {
  records: { records: any; loading: boolean };
  getRecords: () => void;
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

const RecordsPage: React.FC<Props> = ({
  records: { records, loading },
  getRecords,
}) => {
  useEffect(() => {
    getRecords();
  }, [getRecords]);

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
      <IonContent>
        {records && (
          <IonList>
            {records.map((record: Record) => (
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
  getRecords: () => dispatch(getRecords()),
});

const mapStateToProps = (state: any) => ({
  records: state.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage);
