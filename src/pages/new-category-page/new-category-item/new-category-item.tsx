import React from 'react';
import {
  IonSelectOption,
  IonIcon,
  IonLabel,
  IonCol,
  IonItem,
} from '@ionic/react';

interface Props {
  iconString: string;
  chooseIconHandler: (icon: string) => void;
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
      {/* <IonSelectOption value={iconString}>
        <i className='fas fa-paw'></i>
        <IonLabel>
          <IonIcon icon={iconOutline}></IonIcon>text
        </IonLabel>
      </IonSelectOption> */}
    </React.Fragment>
  );
};

export default NewCategoryItem;
