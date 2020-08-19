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
    records: any;
    incomes: number;
    expences: number;
    recordsByCategories: any;
    cashflow: any;
  };
}

const RecordItem: React.FC<Props> = ({
  children,
  records: { incomes, expences },
}) => (
  <IonCol>
    <IonCard>
      <IonItem lines='none' button>
        <IonGrid>
          <IonRow>
            <IonText color='primary'>{children}</IonText>
          </IonRow>
          <IonRow>
            <IonText>{children === 'Expences' ? expences : incomes}</IonText>
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
