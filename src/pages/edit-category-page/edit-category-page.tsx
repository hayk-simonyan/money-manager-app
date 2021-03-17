import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

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
  IonContent,
} from '@ionic/react';

import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';
import CategoryItem from '../new-category-page/category-item/category-item';
import { iconsArray } from '../../assets/icons';

import { connect } from 'react-redux';
import { putCategory } from '../../redux/categories/category.actions';

interface Props {
  putCategory: (id: string, type: string, icon: string, name: string) => void;
}

const EditCategoryPage: React.FC<Props> = ({ putCategory }) => {
  const history = useHistory();
  const [error, setError] = useState<string>();

  // @ts-ignore
  const { id } = useParams();
  const location = useLocation();
  const findCategory: any = location.state;
  const currentCategory: any = { ...findCategory };

  const [type, setType] = useState<string>(currentCategory.type);
  const [icon, setIcon] = useState<string>(currentCategory.icon);
  const nameInputRef = useRef<HTMLIonInputElement>(currentCategory.name);
  const [name, setName] = useState<string>(currentCategory.name);

  // update state if location.state is changed
  useEffect(() => {
    setType(currentCategory.type);
    setName(currentCategory.name);
  }, [location.state]);

  const updateRecordHandler = () => {
    const name = nameInputRef.current!.value;

    if (!type || !icon || !name) {
      setError('Please fill out all required inputs');
      return;
    }

    putCategory(id, type, icon, name.toString());
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
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Type</IonLabel>
                <IonSelect
                  value={type}
                  onIonChange={(e) => setType(e.detail.value)}
                  interface='action-sheet'
                >
                  <IonSelectOption value='expences'>Expence</IonSelectOption>
                  <IonSelectOption value='incomes'>Income</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem onClick={() => setShowModal(true)} button>
                <IonLabel>Icon</IonLabel>
                {showSelectedIcon && (
                  <IonItem lines='none'>
                    <IonIcon icon={selectedIcon}></IonIcon>
                  </IonItem>
                )}
              </IonItem>

              <IonItem>
                <IonLabel position='floating'>Name</IonLabel>
                <IonInput
                  value={name}
                  ref={nameInputRef}
                  autocomplete='off'
                  autocorrect='off'
                ></IonInput>
              </IonItem>
              <IonItem lines='none'>
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
                  <IonButton onClick={() => setShowModal(false)}>
                    Close
                  </IonButton>
                </IonModal>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <SubmitButton onClickHandler={updateRecordHandler} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putCategory: (id: string, type: string, icon: string, name: string) =>
    dispatch(putCategory(id, type, icon, name)),
});

export default connect(null, mapDispatchToProps)(EditCategoryPage);
