import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
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
  IonModal,
  IonIcon,
  IonButton,
  IonList,
  IonRouterLink,
} from '@ionic/react';
import { caretDownOutline } from 'ionicons/icons';
import { postRecord } from '../../redux/records/record.actions';
import { setAlert } from '../../redux/alerts/alert.actions';
import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';
import { Record } from '../../types/common';

interface Props {
  postRecord: (record: Record) => void;
  setAlert: (msg: string, alertType: string) => void;
  accounts: { accounts: any };
  categories: { categories: any };
}

const NewRecordPage: React.FC<Props> = ({
  postRecord,
  setAlert,
  accounts: { accounts },
  categories: { categories },
}) => {
  const history = useHistory();
  const [error, setError] = useState<string>();

  const today: String = new Date().toISOString();

  const [type, setType] = useState<string>('expences');
  const [account, setAccount] = useState<string>(
    accounts[0] ? accounts[0].name : ''
  );
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<any>(today);
  const amountInputRef = useRef<HTMLIonInputElement>(null);
  const noteInputRef = useRef<HTMLIonInputElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState('');

  const changeRecordTypeHandler = (e: any) => {
    setType(e.detail.value);
    setCategory('');
    setCategoryIcon('');
  };

  const addRecordHandler = () => {
    const amount: number = amountInputRef.current!.value as number;
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

    postRecord({
      type,
      account: accountId,
      category: categoryId,
      date: new Date(date),
      amount,
      note: note ? note!.toString() : '',
    });

    setAlert('Record Created', '');
    setType('expences');
    // setAccount('');
    setCategory('');
    setCategoryIcon('');
    setDate(today);
    amountInputRef.current!.value = null;
    noteInputRef.current!.value = null;

    history.push('/');
  };

  const clearError = () => {
    setError('');
  };

  const setCategoryHandler = (e: any, c: any) => {
    e.stopPropagation();
    setCategory(c.name);
    setCategoryIcon(c.icon);
    setShowModal(false);
    setTimeout(() => amountInputRef.current?.setFocus(), 0);
  };

  const expenseCategoriesSelectOptions = categories.map((c: any) => {
    if (c.type === 'expences') {
      return (
        <IonCol key={c._id} size='6'>
          <IonItem button onClick={(e) => setCategoryHandler(e, c)}>
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
    return null;
  });
  const incomeCategoriesSelectOptions = categories.map((c: any) => {
    if (c.type === 'incomes') {
      return (
        <IonCol key={c._id} size='6'>
          <IonItem button onClick={(e) => setCategoryHandler(e, c)}>
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
    return null;
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
              <IonItem lines='full' button onClick={() => setShowModal(true)}>
                <IonLabel>Category</IonLabel>
                <IonLabel style={{ textAlign: 'right' }}>{category}</IonLabel>
                {categoryIcon ? (
                  <IonIcon
                    slot='end'
                    icon={`${require(`../../assets/ionicons/${categoryIcon}.svg`)}`}
                  />
                ) : (
                  <IonIcon
                    style={{
                      opacity: '0.6',
                      width: '0.75em',
                      marginRight: '0.1em',
                    }}
                    size='small'
                    slot='end'
                    icon={caretDownOutline}
                  />
                )}

                <IonModal isOpen={showModal} cssClass='my-custom-class'>
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

                  <IonRouterLink href='/categories'>
                    <IonButton
                      style={{ marginLeft: '1em', marginRight: '1em' }}
                      expand='full'
                      shape='round'
                    >
                      + Create a new category
                    </IonButton>
                  </IonRouterLink>
                  <IonButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(false);
                    }}
                    style={{ margin: '1em' }}
                    shape='round'
                  >
                    Close
                  </IonButton>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Amount</IonLabel>
                <IonInput
                  ref={amountInputRef}
                  type='number'
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Note</IonLabel>
                <IonInput
                  ref={noteInputRef}
                  autocomplete='off'
                  autocorrect='off'
                  spellcheck={false}
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
  postRecord: (record: Record) => dispatch(postRecord(record)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecordPage);
