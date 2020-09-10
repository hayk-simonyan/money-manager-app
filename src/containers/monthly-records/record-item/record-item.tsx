import React from 'react';

import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonText,
  IonCard,
  IonLabel,
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
  <IonCol size='4'>
    <IonItem lines='full' button>
      <IonGrid>
        <IonRow>
          <IonLabel color='primary'>{children}</IonLabel>
        </IonRow>
        <IonRow>
          {children === 'Incomes' && <IonLabel>{incomes}</IonLabel>}
          {children === 'Expences' && <IonLabel>{expences}</IonLabel>}
          {children === 'Balance' && (
            <IonLabel color={incomes - expences >= 0 ? 'success' : 'danger'}>
              {incomes - expences}
            </IonLabel>
          )}
        </IonRow>
      </IonGrid>
    </IonItem>
  </IonCol>
);

const mapStateToProps = (state: any) => ({
  records: state.records,
});

export default connect(mapStateToProps)(RecordItem);
