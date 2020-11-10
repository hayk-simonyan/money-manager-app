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
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import { deleteCategory } from '../../../redux/categories/category.actions';
import { setAlert } from '../../../redux/alerts/alert.actions';

import './category-item.css';

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
  const history = useHistory();

  const redirectToCategory = (id: string) => {
    history.push(`/categories/${_id}`, { id: _id, type, icon, name });
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteCategoryHandler = () => {
    deleteCategory(_id);
    setAlert('Category Was Removed', 'success');
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
          <IonCol size='2' className='container'>
            <IonLabel className='vertical-center'>
              <IonIcon
                style={{
                  position: 'abssolute',
                  margin: 'auto',
                  top: '-0.9rem',
                  left: '-0.6rem',
                  right: 0,
                  bottom: 0,
                  fontSize: '1.25rem',
                }}
                icon={iconOutline}
              ></IonIcon>
            </IonLabel>
          </IonCol>
          <IonCol size='6' className='container'>
            <IonLabel className='vertical-center'>{name}</IonLabel>
          </IonCol>
          <IonCol size='2' className='container'>
            <IonButton
              onClick={openModal}
              color='primary'
              className='vertical-align'
            >
              <IonIcon slot='icon-only' icon={trashOutline}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol size='2' className='container'>
            <IonButton
              onClick={() => redirectToCategory(_id)}
              color='primary'
              className='vertical-align'
            >
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
