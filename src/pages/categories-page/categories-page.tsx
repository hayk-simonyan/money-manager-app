import React, { useState } from 'react';

import { IonPage, IonContent } from '@ionic/react';

import Header from '../../components/header/header';
import CategoriesPageControls from '../../components/categories-page-controls/categories-page-controls';
import CategoryItem from './category-item/category-item';
import AddButton from '../../components/add-button/add-button';

const arr = [
  { id: '1', name: 'blob', type: 'expences', icon: 'url' },
  { id: '2', name: 'blob', type: 'expences', icon: 'url' },
  { id: '3', name: 'blob', type: 'expences', icon: 'url' },
  { id: '4', name: 'blob', type: 'income', icon: 'url' },
  { id: '5', name: 'blob', type: 'expences', icon: 'url' },
];

const CategoriesPage: React.FC = () => {
  const [segment, setSegment] = useState<'expences' | 'income'>('expences');

  const expenceCategories = arr.map(
    (category) =>
      category.type === 'expences' && (
        <CategoryItem key={category.id} category={category} />
      )
  );
  const incomeCategories = arr.map(
    (category) =>
      category.type === 'income' && (
        <CategoryItem key={category.id} category={category} />
      )
  );

  return (
    <IonPage>
      <Header title='Categories' menu={true} />
      <IonContent>
        <CategoriesPageControls
          segmentValue={segment}
          segmentChangeHandler={(e) => setSegment(e)}
        />
        {segment === 'expences' ? (
          <React.Fragment>{expenceCategories}</React.Fragment>
        ) : (
          <React.Fragment>{incomeCategories}</React.Fragment>
        )}
        <AddButton url='categories/new' />
      </IonContent>
    </IonPage>
  );
};

export default CategoriesPage;
