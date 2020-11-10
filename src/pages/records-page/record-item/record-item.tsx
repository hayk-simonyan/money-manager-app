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
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import { deleteRecord } from '../../../redux/records/record.actions';
import { setAlert } from '../../../redux/alerts/alert.actions';

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
  deleteRecord: (id: string) => void;
  setAlert: (msg: string, alertType: string) => void;
}

const RecordItem: React.FC<Props> = ({
  record: { _id, type, account, category, date, amount, note },
  deleteRecord,
  setAlert,
}) => {
  const history = useHistory();

  const redirectToRecord = (id: string) => {
    history.push(`/records/${id}`, {
      id,
      type,
      account,
      category,
      date,
      amount,
      note,
    });
  };

  const [startedDeleting, setStartedDeleting] = useState<boolean>(false);

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const startDeleteHandler = () => {
    setStartedDeleting(true);
    slidingOptionsRef.current?.closeOpened();
  };
  const deleteRecordHandler = (id: string) => {
    deleteRecord(id);
    setAlert('Record was Removed', 'success');
  };

  let [month, day, year] = new Date(date).toLocaleDateString().split('/');

  let selectedIcon = require(`../../../assets/ionicons/${category.icon}.svg`);

  return (
    <React.Fragment>
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
        <IonItem onClick={() => redirectToRecord(_id)} lines='full' button>
          <IonGrid>
            <IonRow>
              <IonCol size='2' className='ion-no-padding'>
                <IonIcon
                  style={{
                    position: 'absolute',
                    margin: 'auto',
                    top: '-0.9rem',
                    left: '-0.6rem',
                    right: 0,
                    bottom: 0,
                    fontSize: '1.25rem',
                  }}
                  icon={selectedIcon}
                />
              </IonCol>
              <IonCol size='10' className='ion-no-padding'>
                <IonGrid>
                  <IonRow>
                    <IonCol size='7'>
                      <IonLabel>{category.name}</IonLabel>
                    </IonCol>
                    <IonCol size='5' className='ion-text-right '>
                      <IonLabel>
                        {type === 'expences' ? `-${amount}` : amount}$
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size='7'>
                      <IonCardSubtitle>{account.name}</IonCardSubtitle>
                    </IonCol>
                    <IonCol size='5' className='ion-text-right '>
                      <IonCardSubtitle>{day + '/' + month}</IonCardSubtitle>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>

            {/* <IonRow className='container'>
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
            </IonRow> */}
          </IonGrid>
        </IonItem>
      </IonItemSliding>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  deleteRecord: (id: string) => dispatch(deleteRecord(id)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({});

export default connect(null, mapDispatchToProps)(RecordItem);
