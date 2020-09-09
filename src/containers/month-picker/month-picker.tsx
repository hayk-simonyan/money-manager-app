import React, { useState, useEffect } from 'react';

import { IonSelect, IonSelectOption } from '@ionic/react';

import { connect } from 'react-redux';
import { getRecords } from '../../redux/records/record.actions';

interface Props {
  getRecords: (year?: string, month?: string) => void;
}

const MonthPicker: React.FC<Props> = ({ getRecords }) => {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth().toString());
  const [year, setYear] = useState(date.getFullYear().toString());
  if (month.length === 1) setMonth(`0${parseInt(month) + 1}`);

  useEffect(() => {
    getRecords(year, month);
  }, [month]);

  return (
    <IonSelect
      value={month}
      interface='action-sheet'
      cancelText='Cancel'
      okText='Ok'
      onIonChange={(e: any) => setMonth(e.detail.value)}
    >
      <IonSelectOption value='00'>January</IonSelectOption>
      <IonSelectOption value='01'>February</IonSelectOption>
      <IonSelectOption value='02'>March</IonSelectOption>
      <IonSelectOption value='03'>April</IonSelectOption>
      <IonSelectOption value='04'>May</IonSelectOption>
      <IonSelectOption value='05'>June</IonSelectOption>
      <IonSelectOption value='06'>July</IonSelectOption>
      <IonSelectOption value='07'>August</IonSelectOption>
      <IonSelectOption value='08'>September</IonSelectOption>
      <IonSelectOption value='09'>October</IonSelectOption>
      <IonSelectOption value='10'>November</IonSelectOption>
      <IonSelectOption value='11'>December</IonSelectOption>
    </IonSelect>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getRecords: (year?: string, month?: string) =>
    dispatch(getRecords(year, month)),
});

export default connect(null, mapDispatchToProps)(MonthPicker);
