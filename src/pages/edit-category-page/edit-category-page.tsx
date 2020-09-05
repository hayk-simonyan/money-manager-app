import React, { useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
  IonIcon,
  IonButton,
  IonModal,
} from '@ionic/react';

import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';
import CategoryItem from '../new-category-page/category-item/category-item';
import { iconsArray } from '../../assets/icons';

import { connect } from 'react-redux';
import { putCategory } from '../../redux/categories/category.actions';
import { setAlert } from '../../redux/alerts/alert.actions';

interface Category {
  _id: string;
  icon: string;
  name: string;
  total: string;
}

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
  const history = useHistory();
  const [error, setError] = useState<string>();

  const { id } = useParams();
  const currentCategory = categories.find((c: Category) => c._id === id);

  const [type, setType] = useState<string>(currentCategory.type);
  const [icon, setIcon] = useState<string>(currentCategory.icon);
  const nameInputRef = useRef<HTMLIonInputElement>(currentCategory.name);
  const [name, setName] = useState<string>(currentCategory.name);

  const updateRecordHandler = () => {
    const name = nameInputRef.current!.value;

    if (!type || !icon || !name) {
      setError('Please fill out all required inputs');
      return;
    }

    putCategory(id, type, icon, name.toString());
    setAlert('Account was updated', 'success');
    history.push('/categories');
  };

  const clearError = () => {
    setError('');
  };

  // show modal to choose an icon
  const [showModal, setShowModal] = useState(false);
  // show or hide icon
  const [showSelectedIcon, setShowSelectedIcon] = useState(true);
  // set the selected icon
  let selectedIcon = require(`../../assets/ionicons/${icon}.svg`);
  // set the icon state on icon click
  const chooseIconHandler = (iconString: string) => {
    setIcon(iconString);
    setShowSelectedIcon(true);
    setShowModal(false);
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
              <IonButton color='light' onClick={() => setShowModal(true)}>
                Icon
              </IonButton>
              {showSelectedIcon && (
                <IonItem lines='none'>
                  <IonIcon icon={selectedIcon}></IonIcon>
                </IonItem>
              )}

              <IonModal isOpen={showModal} cssClass='my-custom-class'>
                <IonGrid>
                  <IonRow>
                    {iconsArray.map((icon: any, index: any) => (
                      <CategoryItem
                        chooseIconHandler={chooseIconHandler}
                        key={index}
                        iconString={icon}
                      />
                    ))}
                  </IonRow>
                </IonGrid>
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonModal>
            </IonItem>
            {/* <IonItem>
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
            </IonItem> */}
            <IonItem>
              <IonLabel position='floating'>Name</IonLabel>
              <IonInput value={name} ref={nameInputRef} type='text'></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SubmitButton onClickHandler={updateRecordHandler} />
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
