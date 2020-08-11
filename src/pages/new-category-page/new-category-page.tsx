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
} from '@ionic/react';

import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';

import { connect } from 'react-redux';
import { postCategory } from '../../redux/categories/category.actions';
import { setAlert } from '../../redux/alerts/alert.actions';

interface Props {
  postCategory: (type: string, icon: string, name: string) => void;
  setAlert: (msg: string, alertType: string) => void;
}

const NewCategoryPage: React.FC<Props> = ({ postCategory, setAlert }) => {
  const history = useHistory();
  const [error, setError] = useState<string>();

  const [type, setType] = useState<string>('expences');
  const [icon, setIcon] = useState<string>('');
  const nameInputRef = useRef<HTMLIonInputElement>(null);

  const addRecordHandler = () => {
    const name = nameInputRef.current!.value;

    if (!type || !icon || !name) {
      setError('Please fill out all required inputs');
      return;
    }

    postCategory(type, icon, name.toString());
    setAlert('Account was created', 'success');
    history.push('/categories');
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
      <Header title='Add Category' menu={false} />
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
              <IonLabel>Icon</IonLabel>
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
              <IonLabel position='floating'>Name</IonLabel>
              <IonInput ref={nameInputRef} type='text'></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={addRecordHandler} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  postCategory: (type: string, icon: string, name: string) =>
    dispatch(postCategory(type, icon, name)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

export default connect(null, mapDispatchToProps)(NewCategoryPage);
