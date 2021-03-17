import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

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
  IonDatetime,
  IonContent,
} from '@ionic/react';

import Header from '../../components/header/header';

import { connect } from 'react-redux';
import { putRecord, deleteRecord } from '../../redux/records/record.actions';
import { setAlert } from '../../redux/alerts/alert.actions';
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
  setAlert: (msg: string, alertType: string) => void;
  accounts: { accounts: any; loading: boolean };
  categories: { categories: any; loading: boolean };
}

const EditRecordPage: React.FC<Props> = ({
  putRecord,
  deleteRecord,
  setAlert,
  accounts: { accounts },
  categories: { categories },
}) => {
  //@ts-ignore
  const { id } = useParams();
  const location = useLocation();
  const findRecord: any = location.state;
  const currentRecord = { ...findRecord };

  const history = useHistory();
  const [error, setError] = useState<string>();
  const clearError = () => {
    setError('');
  };

  const [type, setType] = useState<string>(currentRecord.type);
  const [account, setAccount] = useState<string>(
    currentRecord.account ? currentRecord.account.name : null
  );
  const [category, setCategory] = useState<string>(
    currentRecord.account ? currentRecord.category.name : null
  );
  const [date, setDate] = useState<string>(currentRecord.date);
  const amountInputRef = useRef<HTMLIonInputElement>(currentRecord.amount);
  const noteInputRef = useRef<HTMLIonInputElement>(null);

  const [amount, setAmount] = useState<number>(currentRecord.amount);
  const [note, setNote] = useState<string>(currentRecord.note);

  // update state if location.state is changed
  useEffect(() => {
    setType(currentRecord.type);
    setAccount(currentRecord.account ? currentRecord.account.name : null);
    setCategory(currentRecord.account ? currentRecord.category.name : null);
    setDate(currentRecord.date);

    setAmount(currentRecord.amount);
    setNote(currentRecord.note);
  }, [location.state]);

  const changeRecordTypeHandler = (e: any) => {
    setType(e.detail.value);
    setCategory('');
  };

  const updateRecordHandler = () => {
    const amount = amountInputRef.current!.value;
    const note = noteInputRef.current!.value;

    if (!type || !account || !category || !date || !amount) {
      setError('Please fill out all required inputs');
      return;
    }
    if (+amount <= 0) {
      setError('Amount can not be less or equal to 0');
      return;
    }

    const a = accounts.find((a: any) => a.name === account);
    const accountId = a._id;

    const c = categories.find((c: any) => c.name === category);
    const categoryId = c._id;

    putRecord(
      id,
      type,
      accountId,
      categoryId,
      new Date(date),
      parseInt(amount.toString()),
      note!.toString()
    );
    setAlert('Record Updated', 'success');
    history.push('/');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteRecordHandler = () => {
    history.push('/');
    deleteRecord(id);
    setAlert('Record Removed', 'success');
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={isOpen}
        message='Are you sure?'
        buttons={[
          { text: 'No', handler: toggleModal },
          { text: 'Yes', handler: deleteRecordHandler },
        ]}
      />
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: clearError }]}
      />
      <Header title='Edit Record' menu={false} />
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
                  <IonSelectOption value='incomes'>Incomes</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Account</IonLabel>
                <IonSelect
                  value={account || null}
                  onIonChange={(e) => setAccount(e.detail.value)}
                  interface='action-sheet'
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
                  value={category || null}
                  cancelText='Cancel'
                  okText='Ok'
                  onIonChange={(e) => setCategory(e.detail.value)}
                  interface='action-sheet'
                >
                  {categories &&
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
                    })}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Amount</IonLabel>
                <IonInput
                  ref={amountInputRef}
                  value={amount}
                  type='number'
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Note</IonLabel>
                <IonInput
                  ref={noteInputRef}
                  value={note}
                  autocomplete='off'
                  autocorrect='off'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='2' offset='2'>
              <IonButton onClick={toggleModal} color='tertiary'>
                <IonIcon icon={trashOutline} slot='icon-only' />
              </IonButton>
            </IonCol>
            <IonCol size='4' offset='4'>
              <IonButton onClick={updateRecordHandler} color='primary'>
                <IonIcon icon={checkmarkOutline} slot='icon-only' />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
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
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecordPage);
