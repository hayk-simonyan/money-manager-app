import React, { useState } from 'react';

import { IonContent, IonPage } from '@ionic/react';

import Header from '../../components/header/header';
import AddButton from '../../components/add-button/add-button';
import Accounts from '../../containers/accounts/accounts';
import MonthlyRecords from '../../containers/monthly-records/monthly-records';
import Chart from '../../containers/chart/chart';
import HomepageControls from '../../components/homepage-controls/homepage-controls';

const Homepage: React.FC = () => {
  const [segment, setSegment] = useState<'main' | 'chart'>('main');

  return (
    <IonPage>
      <Header title='Home' menu={true} />
      <IonContent>
        <HomepageControls
          segmentValue={segment}
          segmentChangeHandler={(e) => setSegment(e)}
        />
        {segment === 'main' ? (
          <React.Fragment>
            <Accounts />
            <MonthlyRecords />
          </React.Fragment>
        ) : (
          <Chart />
        )}
      </IonContent>
      <AddButton />
    </IonPage>
  );
};

export default Homepage;
