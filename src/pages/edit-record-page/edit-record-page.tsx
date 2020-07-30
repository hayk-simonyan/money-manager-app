import React, { useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  IonGrid,
  IonAlert,
  IonPage,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonRow,
  IonSelectOption,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonDatetime,
  IonToast,
} from '@ionic/react';

import Header from '../../components/header/header';

import { connect } from 'react-redux';
import {
  putRecord,
  deleteRecord,
  getRecords,
} from '../../redux/records/record.actions';
import { setAlert } from '../../redux/alerts/alert.actions';
import SubmitButton from '../../components/submit-button/submit-button';
import { trashOutline, checkmarkOutline } from 'ionicons/icons';

interface Props {
  putRecord: (
    id: string,
    type: string,
    account: string,
    category: string,
    date: Date,
    amount: number,
    note: string
  ) => void;
  deleteRecord: (id: string) => void;
  getRecords: () => void;
  records: { records: any; loading: boolean };
  accounts: { accounts: any; loading: boolean };
  categories: { categories: any; loading: boolean };
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

const EditRecordPage: React.FC<Props> = ({
  putRecord,
  deleteRecord,
  getRecords,
  records: { records, loading },
  accounts: { accounts },
  categories: { categories },
}) => {
  const history = useHistory();
  const [error, setError] = useState<string>();
  const clearError = () => {
    setError('');
  };

  const { id } = useParams();
  const currentRecord = records.filter((r: Record) => r._id === id);

  const accountArray = accounts.map((a: any) => {
    if (a._id == currentRecord[0].account) return a;
  });
  const acc = accountArray[0];

  const categoryArray = categories.map((c: any) => {
    if (c._id == currentRecord[0].category) return c;
  });
  const categ = categoryArray[0];

  const [type, setType] = useState<string>(currentRecord[0].type);
  const [account, setAccount] = useState<string>(acc.name);
  const [category, setCategory] = useState<string>(categ.name);
  const [date, setDate] = useState<string>(currentRecord[0].date);
  const amountInputRef = useRef<HTMLIonInputElement>(currentRecord[0].amount);
  const [amount, setAmount] = useState<number>(currentRecord[0].amount);
  const noteInputRef = useRef<HTMLIonInputElement>(null);
  const [note, setNote] = useState<string>(currentRecord[0].note);

  console.log(amountInputRef.current.value);
  console.log(currentRecord[0].amount);

  const updateRecordHandler = () => {
    const amount = amountInputRef.current!.value;
    const note = noteInputRef.current!.value;

    if (!type || !account || !category || !date || !amount) {
      setError('Please fill out all required inputs');
      return;
    }
    if (+amount <= 0) {
      setError('Amount cant be less or equal to 0');
      return;
    }

    // putRecord(id, icon.toString(), name.toString(), total.toString());
    setAlert('Account Was Updated', 'success');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteRecordHandler = async () => {
    deleteRecord(id);
    await getRecords();
    setAlert('Account Was Removed', 'success');
    history.push('/records');
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const clearModal = () => {
    setIsOpen(false);
  };

  return loading ? (
    <IonSpinner />
  ) : (
    <IonPage>
      <IonAlert
        isOpen={isOpen}
        message='Are you sure?'
        buttons={[
          { text: 'No', handler: clearModal },
          { text: 'Yes', handler: deleteRecordHandler },
        ]}
      />
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <Header title='Add Record' menu={false} />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Type</IonLabel>
              <IonSelect
                value={type}
                onIonChange={(e) => setType(e.detail.value)}
              >
                <IonSelectOption value='expences'>Expence</IonSelectOption>
                <IonSelectOption value='incomes'>Income</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Account</IonLabel>
              <IonSelect
                value={account}
                onIonChange={(e) => setAccount(e.detail.value)}
              >
                {accounts &&
                  accounts.map((a: any) => (
                    <IonSelectOption key={a._id} value={a.name}>
                      {a.name}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Category</IonLabel>
              <IonSelect
                value={category}
                cancelText='Cancel'
                okText='Ok'
                onIonChange={(e) => setCategory(e.detail.value)}
              >
                {categories &&
                  categories.map((c: any) => (
                    <IonSelectOption key={c._id} value={c.name}>
                      {c.name}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              {/* <IonInput
                autocomplete='on'
                autocorrect='on'
                ref={dateInputRef}
                type='date'
              /> */}
              <IonDatetime
                value={date}
                // onIonChange={(e) => setDate(e.detail.value)}
                display-timezone='utc'
              ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Amount</IonLabel>
              <IonInput
                ref={amountInputRef}
                value={amount}
                // onIonChange={(e) => setAmount(e.detail.value)}
                type='number'
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Note</IonLabel>
              <IonInput
                ref={noteInputRef}
                value={note}
                // onIonChange={(e) => setAmount(e.detail.value)}
                type='text'
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='4'>
            <IonButton onClick={openModal} color='light'>
              <IonIcon icon={trashOutline} slot='icon-only' />
            </IonButton>
          </IonCol>
          <IonCol size='4' offset='4'>
            <IonButton
              onClick={updateRecordHandler}
              routerLink='/'
              color='primary'
            >
              <IonIcon icon={checkmarkOutline} slot='icon-only' />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={updateRecordHandler} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putRecord: (
    id: string,
    type: string,
    account: string,
    category: string,
    date: Date,
    amount: number,
    note: string
  ) => dispatch(putRecord(id, type, account, category, date, amount, note)),
  deleteRecord: (id: string) => dispatch(deleteRecord(id)),
  getRecords: () => dispatch(getRecords()),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  records: state.records,
  accounts: state.accounts,
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecordPage);
