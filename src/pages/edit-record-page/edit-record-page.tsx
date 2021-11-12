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
  IonModal,
  IonList,
} from '@ionic/react';
import { caretDownOutline } from 'ionicons/icons';

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
    note: string,
    prevAccount?: string
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
  const history = useHistory();
  const findRecord: any = location.state;
  const currentRecord = { ...findRecord };

  const [error, setError] = useState<string>('');
  const clearError = () => {
    setError('');
  };

  const [type, setType] = useState<string>(currentRecord.type);
  const [account, setAccount] = useState<string>(
    currentRecord.account ? currentRecord.account.name : null
  );
  const [category, setCategory] = useState<string>(
    currentRecord.account ? currentRecord.category.name : ''
  );
  const [date, setDate] = useState<string>(currentRecord.date);
  const amountInputRef = useRef<HTMLIonInputElement>(currentRecord.amount);
  const noteInputRef = useRef<HTMLIonInputElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(
    currentRecord.account ? currentRecord.category.icon : ''
  );

  const [amount, setAmount] = useState<number>(currentRecord.amount);
  const [note, setNote] = useState<string>(currentRecord.note);

  // update state if location.state is changed
  useEffect(() => {
    setAccount(currentRecord.account ? currentRecord.account.name : null);
    setCategory(currentRecord.category ? currentRecord.category.name : '');
    setDate(currentRecord.date);

    setAmount(currentRecord.amount);
    setNote(currentRecord.note);

    setCategoryIcon(currentRecord.account ? currentRecord.category.icon : '');
  }, [location.state]);

  const changeRecordTypeHandler = (e: any) => {
    setType(e.detail.value);
    setCategory('');
    setCategoryIcon('');
  };

  const setCategoryHandler = (e: any, c: any) => {
    e.stopPropagation();
    setCategory(c.name);
    setCategoryIcon(c.icon);
    setShowModal(false);
    setTimeout(() => amountInputRef.current?.setFocus(), 0);
  };

  const updateRecordHandler = () => {
    const amount: number = amountInputRef.current!.value as number;
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

    const prevAccountId = currentRecord.account?._id || '';

    putRecord(
      id,
      type,
      accountId,
      categoryId,
      new Date(date),
      amount,
      note!.toString(),
      prevAccountId
    );
    setAlert('Record Updated', '');
    history.push('/');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteRecordHandler = () => {
    history.push('/');
    deleteRecord(id);
    setAlert('Record Removed', '');
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const expenseCategoriesSelectOptions = categories.map((c: any) => {
    if (c.type === 'expences') {
      return (
        <IonCol size="6">
          <IonItem key={c._id} button onClick={(e) => setCategoryHandler(e, c)}>
            <IonLabel>
              <IonIcon
                icon={`${require(`../../assets/ionicons/${c.icon}.svg`)}`}
                style={{ paddingRight: '0.7em' }}
              />
              {c.name}
            </IonLabel>
          </IonItem>
        </IonCol>
      );
    }
  });
  const incomeCategoriesSelectOptions = categories.map((c: any) => {
    if (c.type === 'incomes') {
      return (
        <IonCol size="6">
          <IonItem key={c._id} button onClick={(e) => setCategoryHandler(e, c)}>
            <IonLabel>
              <IonIcon
                icon={`${require(`../../assets/ionicons/${c.icon}.svg`)}`}
                style={{ paddingRight: '0.7em' }}
              />
              {c.name}
            </IonLabel>
          </IonItem>
        </IonCol>
      );
    }
  });

  return (
    <IonPage>
      <IonAlert
        isOpen={isOpen}
        message="Are you sure?"
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
      <Header title="Edit Record" menu={false} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonDatetime
                value={date}
                onIonChange={(e) => setDate(e.detail.value!)}
                display-timezone="utc"
              ></IonDatetime>
              <IonItem>
                <IonLabel>Type</IonLabel>
                <IonSelect
                  value={type}
                  onIonChange={changeRecordTypeHandler}
                  interface="action-sheet"
                >
                  <IonSelectOption value="expences">Expences</IonSelectOption>
                  <IonSelectOption value="incomes">Incomes</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Account</IonLabel>
                <IonSelect
                  value={account || null}
                  onIonChange={(e) => setAccount(e.detail.value)}
                  interface="action-sheet"
                >
                  {accounts &&
                    accounts.map((a: any) => (
                      <IonSelectOption key={a._id} value={a.name}>
                        {a.name}
                      </IonSelectOption>
                    ))}
                </IonSelect>
              </IonItem>
              <IonItem lines="full" button onClick={() => setShowModal(true)}>
                <IonLabel>Category</IonLabel>
                <IonLabel style={{ textAlign: 'right' }}>{category}</IonLabel>
                {categoryIcon ? (
                  <IonIcon
                    slot="end"
                    icon={`${require(`../../assets/ionicons/${categoryIcon}.svg`)}`}
                  />
                ) : (
                  <IonIcon
                    style={{
                      opacity: '0.6',
                      width: '0.75em',
                      marginRight: '0.1em',
                    }}
                    size="small"
                    slot="end"
                    icon={caretDownOutline}
                  />
                )}
                <IonModal isOpen={showModal} cssClass="my-custom-class">
                  <IonContent>
                    <IonList>
                      <IonGrid>
                        <IonRow>
                          {categories && type === 'expences'
                            ? expenseCategoriesSelectOptions
                            : incomeCategoriesSelectOptions}
                        </IonRow>
                      </IonGrid>
                    </IonList>
                  </IonContent>
                  <IonButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(false);
                    }}
                    style={{ margin: '1em' }}
                  >
                    Close
                  </IonButton>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Amount</IonLabel>
                <IonInput
                  ref={amountInputRef}
                  value={amount}
                  type="number"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck={false}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Note</IonLabel>
                <IonInput
                  ref={noteInputRef}
                  value={note}
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck={false}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2" offset="2">
              <IonButton onClick={toggleModal} color="tertiary">
                <IonIcon icon={trashOutline} slot="icon-only" />
              </IonButton>
            </IonCol>
            <IonCol size="4" offset="4">
              <IonButton onClick={updateRecordHandler} color="primary">
                <IonIcon icon={checkmarkOutline} slot="icon-only" />
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
    note: string,
    prevAccount?: string
  ) =>
    dispatch(
      putRecord(id, type, account, category, date, amount, note, prevAccount)
    ),
  deleteRecord: (id: string) => dispatch(deleteRecord(id)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecordPage);
