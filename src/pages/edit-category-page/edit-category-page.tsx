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

import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';

import { connect } from 'react-redux';
import { putCategory } from '../../redux/categories/category.actions';
import { setAlert } from '../../redux/alerts/alert.actions';

interface Props {
  putCategory: (id: string, type: string, icon: string, name: string) => void;
  setAlert: (msg: string, alertType: string) => void;
  categories: { categories: any; loading: boolean };
}

const EditCategoryPage: React.FC<Props> = ({
  putCategory,
  setAlert,
  categories: { categories, loading },
}) => {
  const [error, setError] = useState<string>();

  const { id } = useParams();
  const currentCategory = categories.filter(
    (c: { _id: string; icon: string; name: string; total: string }) =>
      c._id === id
  );

  const [type, setType] = useState<string>(currentCategory[0].type);
  const [icon, setIcon] = useState<string>(currentCategory[0].icon);
  const nameInputRef = useRef<HTMLIonInputElement>(currentCategory[0].name);

  const addRecordHandler = () => {
    const name = nameInputRef.current!.value;

    if (!type || !icon || !name) {
      setError('Please fill out all required inputs');
      return;
    }

    putCategory(id, type, icon, name.toString());
    setAlert('Account was updated', 'success');
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
      <Header title='Edit Category' menu={false} />
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
      <SubmitButton url='/categories' onClickHandler={addRecordHandler} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putCategory: (id: string, type: string, icon: string, name: string) =>
    dispatch(putCategory(id, type, icon, name)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryPage);
