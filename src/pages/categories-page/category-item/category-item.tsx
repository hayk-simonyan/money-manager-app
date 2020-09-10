import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonAlert,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
} from '@ionic/react';
import { trashOutline, createOutline } from 'ionicons/icons';

import { connect } from 'react-redux';
import { deleteCategory } from '../../../redux/categories/category.actions';
import { setAlert } from '../../../redux/alerts/alert.actions';

interface Props {
  category: {
    _id: string;
    type: string;
    icon: string;
    name: string;
  };
  deleteCategory: (id: string) => void;
  setAlert: (msg: string, alertType: string) => void;
}

const CategoryItem: React.FC<Props> = ({
  category: { _id, type, icon, name },
  deleteCategory,
  setAlert,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteCategoryHandler = () => {
    deleteCategory(_id);
    setAlert('Account Was Removed', 'success');
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const clearModal = () => {
    setIsOpen(false);
  };

  let iconOutline = require(`../../../assets/ionicons/${icon}.svg`);

  return (
    <IonItem button>
      <IonAlert
        isOpen={isOpen}
        message='Are you sure? This will also remove all the records related to this category'
        buttons={[
          { text: 'No', handler: clearModal },
          { text: 'Yes', handler: deleteCategoryHandler },
        ]}
      />
      <IonGrid>
        <IonRow>
          <IonCol size='2'>
            <IonLabel>
              <IonIcon icon={iconOutline}></IonIcon>
            </IonLabel>
          </IonCol>
          <IonCol size='6'>
            <IonLabel>{name}</IonLabel>
          </IonCol>
          <IonCol size='2'>
            <IonButton color='secondary' onClick={openModal}>
              <IonIcon slot='icon-only' icon={trashOutline}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol size='2'>
            <IonButton routerLink={`/categories/${_id}`} color='secondary'>
              <IonIcon slot='icon-only' icon={createOutline}></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  deleteCategory: (id: string) => dispatch(deleteCategory(id)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
