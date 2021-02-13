import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonAlert,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonContent,
} from '@ionic/react';

import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';

import { connect } from 'react-redux';
import { postRecord } from '../../redux/records/record.actions';
import { setAlert } from '../../redux/alerts/alert.actions';

interface Props {
  postRecord: (
    type: string,
    account: string,
    category: string,
    date: Date,
    amount: number,
    note: string
  ) => void;
  setAlert: (msg: string, alertType: string) => void;
  accounts: { accounts: any };
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

const NewRecordPage: React.FC<Props> = ({
  postRecord,
  setAlert,
  accounts: { accounts },
  categories: { categories, loading },
}) => {
  const history = useHistory();
  const [error, setError] = useState<string>();

  const myDate: String = new Date().toISOString();

  const [type, setType] = useState<string>('expences');
  const [account, setAccount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<any>(myDate);
  const amountInputRef = useRef<HTMLIonInputElement>(null);
  const noteInputRef = useRef<HTMLIonInputElement>(null);

  const changeRecordTypeHandler = (e: any) => {
    setType(e.detail.value);
    setCategory('');
  };

  const addRecordHandler = () => {
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

    const a = accounts.find((a: any) => a.name === account);
    const accountId = a._id;

    const c = categories.find((c: any) => c.name === category);
    const categoryId = c._id;

    postRecord(
      type,
      accountId,
      categoryId,
      new Date(date),
      parseInt(amount.toString()),
      note ? note!.toString() : ''
    );
    setAlert('Record Created', 'success');
    history.push('/');

    setType('expences');
    setAccount('');
    setCategory('');
    setDate(myDate);
    amountInputRef.current!.value = null;
    noteInputRef.current!.value = null;
  };

  const clearError = () => {
    setError('');
  };

  const expenseCategoriesSelectOptions = categories.map((c: any) => {
    if (c.type === 'expences') {
      return (
        <IonSelectOption key={c._id} value={c.name}>
          {c.name}
        </IonSelectOption>
      );
    }
  });
  const incomeCategoriesSelectOptions = categories.map((c: any) => {
    if (c.type === 'incomes') {
      return (
        <IonSelectOption key={c._id} value={c.name}>
          {c.name}
        </IonSelectOption>
      );
    }
  });
  const accountSelectOptions = accounts.map((a: any) => (
    <IonSelectOption key={a._id} value={a.name}>
      {a.name}
    </IonSelectOption>
  ));

  return (
    <IonPage>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <Header title='New Record' menu={false} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonDatetime
                value={date}
                onIonChange={(e) => setDate(e.detail.value!)}
                display-timezone='utc'
              ></IonDatetime>
              <IonItem>
                <IonLabel>Type</IonLabel>
                <IonSelect
                  value={type}
                  onIonChange={changeRecordTypeHandler}
                  interface='action-sheet'
                >
                  <IonSelectOption value='expences'>Expences</IonSelectOption>
                  <IonSelectOption value='incomes'>Income</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Account</IonLabel>
                <IonSelect
                  value={account}
                  onIonChange={(e) => setAccount(e.detail.value)}
                  interface='action-sheet'
                >
                  {accounts && accountSelectOptions}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Category</IonLabel>
                <IonSelect
                  value={category}
                  cancelText='Cancel'
                  okText='Ok'
                  onIonChange={(e) => setCategory(e.detail.value)}
                  interface='action-sheet'
                >
                  {categories && type === 'expences'
                    ? expenseCategoriesSelectOptions
                    : incomeCategoriesSelectOptions}
                  {/* {categories &&
                    categories.map((c: any) => {
                      if (type === 'expences' && c.type === 'expences') {
                        return (
                          <IonSelectOption key={c._id} value={c.name}>
                            {c.name}
                          </IonSelectOption>
                        );
                      }
                      if (type === 'incomes' && c.type === 'incomes') {
                        return (
                          <IonSelectOption key={c._id} value={c.name}>
                            {c.name}
                          </IonSelectOption>
                        );
                      }
                    })} */}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Amount</IonLabel>
                <IonInput ref={amountInputRef} type='number'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Note</IonLabel>
                <IonInput
                  ref={noteInputRef}
                  type='text'
                  autocomplete='off'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <SubmitButton onClickHandler={addRecordHandler} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  postRecord: (
    type: string,
    account: string,
    category: string,
    date: Date,
    amount: number,
    note: string
  ) => dispatch(postRecord(type, account, category, date, amount, note)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecordPage);
