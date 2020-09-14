import React, { useState, useRef, useEffect } from 'react';

import {
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonGrid,
  IonLabel,
  IonCardSubtitle,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonAlert,
  IonToast,
} from '@ionic/react';
import { trash } from 'ionicons/icons';

import { connect } from 'react-redux';
import { getCategories } from '../../../redux/categories/category.actions';

import './record-item.css';

interface Props {
  record: {
    _id: string;
    type: string;
    account: any;
    category: any;
    date: Date;
    amount: number;
    note: string;
  };
  accounts: { accounts: any };
  categories: { categories: any };
  getCategories: () => void;
}

const RecordItem: React.FC<Props> = ({
  record: { _id, type, account, category, date, amount, note },
  accounts: { accounts },
  categories: { categories },
  getCategories,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [startedDeleting, setStartedDeleting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const startDeleteHandler = () => {
    setStartedDeleting(true);
    slidingOptionsRef.current?.closeOpened();
  };
  const deleteRecordHandler = (_id: string) => {
    setToastMessage('Record removed');
  };

  let [month, day, year] = new Date(date).toLocaleDateString().split('/');

  // const acc = accounts.find((a: any) => a._id === account);

  // const categ = categories.find((c: any) => {
  //   console.log(c._id);
  //   console.log(category);
  //   console.log(c._id === category);
  //   return c._id === category;
  // });
  // console.log('categ', categ);

  let selectedIcon = require(`../../../assets/ionicons/${category.icon}.svg`);

  return (
    <React.Fragment>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setToastMessage('')}
      />
      <IonAlert
        isOpen={startedDeleting}
        header='Delete this record?'
        message='This can not be undone'
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => setStartedDeleting(false),
          },
          {
            text: 'Yes',
            handler: () => deleteRecordHandler(_id),
          },
        ]}
      />
      <IonItemSliding ref={slidingOptionsRef}>
        <IonItemOptions>
          <IonItemOption color='danger' onClick={startDeleteHandler}>
            <IonIcon slot='icon-only' icon={trash} />
          </IonItemOption>
        </IonItemOptions>
        <IonItem routerLink={`/records/${_id}`} lines='full' button>
          <IonGrid>
            <IonRow className='container'>
              <IonCol size='2' className='vertical-align'>
                <IonIcon icon={selectedIcon}></IonIcon>
              </IonCol>
              <IonCol size='6'>
                <IonLabel>{category.name}</IonLabel>
              </IonCol>
              <IonCol size='4' className='ion-text-right'>
                <IonLabel>
                  {type === 'expences' ? `-${amount}` : amount}$
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='4' offset='2'>
                <IonCardSubtitle>{account.name}</IonCardSubtitle>
              </IonCol>
              <IonCol size='6' className='ion-text-right'>
                <IonCardSubtitle>{day + '/' + month}</IonCardSubtitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonItemSliding>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getCategories: () => dispatch(getCategories()),
});

const mapStateToProps = (state: any) => ({
  categories: state.categories,
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordItem);
