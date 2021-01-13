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
}) => {
  // filter for colors
  const filteredRecordsByCategories: MonthlyRecord[] = [];
  recordsByCategories.map((recordByCategory, index) => {
    if (
      recordByCategory.type === recordsType &&
      recordByCategory.percentage !== 0
    )
      filteredRecordsByCategories.push(recordByCategory);
  });

  return (
    <IonList>
      {filteredRecordsByCategories.map((recordByCategory, index) =>
        recordByCategory.type === recordsType && recordByCategory.percentage ? (
          <IonItem key={recordByCategory._id} lines='full'>
            {console.log(index)}
            <IonCol size='2'>
              <IonLabel
                className='ion-text-center'
                style={{
                  backgroundColor: colors[index],
                  padding: '4px',
                  borderRadius: '4px',
                }}
              >
                {recordByCategory.percentage}%{' '}
              </IonLabel>
            </IonCol>
            <IonCol size='8'>
              <IonLabel>{recordByCategory.name}</IonLabel>
            </IonCol>
            <IonCol size='2'>
              <IonLabel className='ion-text-end'>
                {`${localStorage.getItem('currency') || '$'} `}
                {recordByCategory.total}
              </IonLabel>
            </IonCol>
          </IonItem>
        ) : null
      )}
    </IonList>
  );
};

export default RecordPercentages;
