import React from 'react';
import { IonCol, IonItem, IonLabel, IonList } from '@ionic/react';

interface MonthlyRecord {
  _id: string;
  type: string;
  icon: string;
  name: string;
  total: number;
  percentage: number;
}

interface Props {
  recordsByCategories: MonthlyRecord[];
  recordsType: string;
  colors?: string[];
}

const RecordPercentages: React.FC<Props> = ({
  recordsByCategories,
  recordsType,
}) => (
  <IonList>
    {recordsByCategories.map((recordByCategory) =>
      recordByCategory.type === recordsType && recordByCategory.percentage ? (
        <IonItem key={recordByCategory._id} lines='none'>
          <IonCol size='2'>
            <IonLabel>{recordByCategory.percentage}% </IonLabel>
          </IonCol>
          <IonCol size='8'>
            <IonLabel>{recordByCategory.name}</IonLabel>
          </IonCol>
          <IonCol size='2'>
            <IonLabel>{recordByCategory.total}</IonLabel>
          </IonCol>
        </IonItem>
      ) : null
    )}
  </IonList>
);

export default RecordPercentages;
