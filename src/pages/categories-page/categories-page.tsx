import React, { useState, useEffect } from 'react';

import { IonPage, IonContent } from '@ionic/react';

import Header from '../../components/header/header';
import CategoriesPageControls from '../../components/categories-page-controls/categories-page-controls';
import CategoryItem from './category-item/category-item';
import AddButton from '../../components/add-button/add-button';

import { connect } from 'react-redux';
import { getCategories } from '../../redux/categories/category.actions';

interface Props {
  categories: { categories: any; loading: boolean };
  getCategories: () => void;
}

interface Category {
  _id: string;
  type: string;
  icon: string;
  name: string;
}

const CategoriesPage: React.FC<Props> = ({
  categories: { categories, loading },
  getCategories,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [segment, setSegment] = useState<'expences' | 'income'>('expences');

  const expenceCategories = categories.map(
    (category: Category) =>
      category.type === 'expences' && (
        <CategoryItem key={category._id} category={category} />
      )
  );
  const incomeCategories = categories.map(
    (category: Category) =>
      category.type === 'incomes' && (
        <CategoryItem key={category._id} category={category} />
      )
  );

  return (
    <IonPage>
      <Header title='Categories' menu={true} />
      <CategoriesPageControls
        segmentValue={segment}
        segmentChangeHandler={(e) => setSegment(e)}
      />
      <IonContent>
        {segment === 'expences' ? (
          <div style={{ paddingBottom: '4.7rem' }}>{expenceCategories}</div>
        ) : (
          <div style={{ paddingBottom: '4.7rem' }}>{incomeCategories}</div>
        )}
      </IonContent>
      <AddButton url='categories/new' />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getCategories: () => dispatch(getCategories()),
});

const mapStateToProps = (state: any) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
