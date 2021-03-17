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
  IonIcon,
  IonModal,
  IonButton,
  IonContent,
} from '@ionic/react';

import Header from '../../components/header/header';
import SubmitButton from '../../components/submit-button/submit-button';
import CategoryItem from './category-item/category-item';
import { iconsArray } from '../../assets/icons';

import { connect } from 'react-redux';
import { postCategory } from '../../redux/categories/category.actions';

interface Props {
  postCategory: (type: string, icon: string, name: string) => void;
}

const NewCategoryPage: React.FC<Props> = ({ postCategory }) => {
  const history = useHistory();
  const [error, setError] = useState<string>();

  const [type, setType] = useState<string>('expences');
  const [icon, setIcon] = useState<string>('starter');
  const nameInputRef = useRef<HTMLIonInputElement>(null);

  const addRecordHandler = () => {
    const name = nameInputRef.current!.value;

    if (!type || !icon || !name || icon === 'starter') {
      setError('Please fill out all required inputs');
      return;
    }

    postCategory(type, icon, name.toString());
    history.push('/categories');

    setType('expences');
    setIcon('starter');
    nameInputRef.current!.value = null;
  };

  const clearError = () => {
    setError('');
  };

  // show modal to choose an icon
  const [showModal, setShowModal] = useState(false);
  // show or hide icon
  const [showSelectedIcon, setShowSelectedIcon] = useState(false);
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
      <Header title='New Category' menu={false} />
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
                  ref={nameInputRef}
                  autocomplete='off'
                  autocorrect='off'
                ></IonInput>
              </IonItem>

              {/* conditional icon sheet */}
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
      <SubmitButton onClickHandler={addRecordHandler} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  postCategory: (type: string, icon: string, name: string) =>
    dispatch(postCategory(type, icon, name)),
});

export default connect(null, mapDispatchToProps)(NewCategoryPage);
