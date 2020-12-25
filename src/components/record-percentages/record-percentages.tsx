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
  colors: string[];
}

const RecordPercentages: React.FC<Props> = ({
  recordsByCategories,
  recordsType,
  colors,
}) => (
  <IonList>
    {recordsByCategories.map((recordByCategory, index) =>
      recordByCategory.type === recordsType && recordByCategory.percentage ? (
        <IonItem key={recordByCategory._id} lines='full'>
          <IonCol size='2'>
            <span
              style={{
                backgroundColor: colors[index],
                padding: '4px',
                borderRadius: '4px',
              }}
            >
              {recordByCategory.percentage}%{' '}
            </span>
          </IonCol>
          <IonCol size='8'>
            <IonLabel>{recordByCategory.name}</IonLabel>
          </IonCol>
          <IonCol size='2'>
            <IonLabel className='ion-text-end'>
              {recordByCategory.total}
            </IonLabel>
          </IonCol>
        </IonItem>
      ) : null
    )}
  </IonList>
);

export default RecordPercentages;