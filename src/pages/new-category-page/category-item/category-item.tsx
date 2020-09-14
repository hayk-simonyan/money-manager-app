import React from 'react';
import { IonIcon, IonCol, IonItem } from '@ionic/react';

interface Props {
  iconString: string;
  chooseIconHandler: (iconString: string) => void;
}

const NewCategoryItem: React.FC<Props> = ({
  iconString,
  chooseIconHandler,
}) => {
  let iconOutline = require(`../../../assets/ionicons/${iconString}.svg`);

  return (
    <React.Fragment>
      <IonCol size='2'>
        <IonItem
          lines='none'
          onClick={() => chooseIconHandler(iconString)}
          button
        >
          <IonIcon size='medium' icon={iconOutline}></IonIcon>
        </IonItem>
      </IonCol>
    </React.Fragment>
  );
};

export default NewCategoryItem;
