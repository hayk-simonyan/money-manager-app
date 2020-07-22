import React from 'react';
import { IonItem, IonLabel, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

interface Props {
  category: {
    id: string;
    type: string;
    icon: string;
    name: string;
  };
}

const CategoryItem: React.FC<Props> = ({
  category: { id, type, icon, name },
}) => {
  return (
    <IonItem routerLink='/categories/:id' button>
      <IonLabel>{icon}</IonLabel>
      <IonLabel>{name}</IonLabel>
      <IonIcon icon={trashOutline}></IonIcon>
    </IonItem>
  );
};

export default CategoryItem;
