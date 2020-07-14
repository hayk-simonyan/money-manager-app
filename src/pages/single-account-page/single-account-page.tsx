import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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
} from '@ionic/react';

import HeaderRecords from '../../components/header-records/header-records';
import SubmitButton from '../../components/submit-button/submit-button';

import { connect } from 'react-redux';
import { putAccount } from '../../redux/accounts/account.actions';

interface Props {
  accounts: { accounts: any; loading: boolean };
  putAccount: (icon: string, name: string, total: string) => void;
}

const SingleAccountPage: React.FC<Props> = ({
  accounts: { accounts, loading },
  putAccount,
}) => {
  const [error, setError] = useState<string>();

  const { id } = useParams();
  const currentAccount = accounts.filter(
    (a: { _id: string; icon: string; name: string; total: string }) =>
      a._id === id
  );

  const [icon, setIcon] = useState<string>(currentAccount[0].icon);
  const [name, setName] = useState<string>(currentAccount[0].icon);
  let [total, setTotal] = useState<string>(currentAccount[0].icon);

  const addAccountHandler = () => {
    // if (!icon || !name || name.toString().trim().length === 0) {
    //   setError('Please set an account icon and name');
    //   return;
    // }
    // if (!total) total = '0';
    // putAccount(icon.toString(), name.toString(), total.toString());
  };

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
      <HeaderRecords />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Icon</IonLabel>
              <IonSelect
                value={icon}
                cancelText='Cancel'
                okText='Ok'
                onIonChange={(e) => setIcon(e.detail.value)}
              >
                <IonSelectOption value='bacon'>Bacon</IonSelectOption>
                <IonSelectOption value='olives'>Black Olives</IonSelectOption>
                <IonSelectOption value='xcheese'>Extra Cheese</IonSelectOption>
                <IonSelectOption value='peppers'>Green Peppers</IonSelectOption>
                <IonSelectOption value='mushrooms'>Mushrooms</IonSelectOption>
                <IonSelectOption value='onions'>Onions</IonSelectOption>
                <IonSelectOption value='pepperoni'>Pepperoni</IonSelectOption>
                <IonSelectOption value='pineapple'>Pineapple</IonSelectOption>
                <IonSelectOption value='sausage'>Sausage</IonSelectOption>
                <IonSelectOption value='Spinach'>Spinach</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Account Name</IonLabel>
              <IonInput
                value={name}
                // @ts-ignore
                onChange={(e) => setName(e.target.value)}
                type='text'
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Initial Amount</IonLabel>
              <IonInput
                value={total}
                // @ts-ignore
                onChange={(e) => setTotal(e.target.value)}
                type='number'
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={addAccountHandler} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putAccount: (icon: string, name: string, total: string) =>
    dispatch(putAccount(icon, name, total)),
});

const mapStateToProps = (state: any) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleAccountPage);
