import React from 'react';

import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonText,
  IonCard,
} from '@ionic/react';

import { connect } from 'react-redux';

interface Props {
  children: string;
  records: {
    monthlyRecords: {
      monthlyRecords: any;
      monthlyIncomes: number;
      monthlyExpences: number;
    };
  };
}

const RecordItem: React.FC<Props> = ({
  children,
  records: {
    monthlyRecords: { monthlyIncomes, monthlyExpences },
  },
}) => (
  <IonCol>
    <IonCard>
      <IonItem lines='none' button>
        <IonGrid>
          <IonRow>
            <IonText color='primary'>{children}</IonText>
          </IonRow>
          <IonRow>
            <IonText>
              {children === 'Expences' ? monthlyExpences : monthlyIncomes}
            </IonText>
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonCard>
  </IonCol>
);

const mapStateToProps = (state: any) => ({
  records: state.records,
});

export default connect(mapStateToProps)(RecordItem);
