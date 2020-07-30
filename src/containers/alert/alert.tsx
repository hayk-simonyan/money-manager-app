import React from 'react';
import { connect } from 'react-redux';
import { IonToast } from '@ionic/react';

interface Props {
  alerts: any[];
}
//@ts-ignore
const Alert: React.FC<Props> = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <IonToast
        key={alert.id}
        isOpen={true}
        color={alert.alertType}
        message={alert.msg}
        duration={2000}
      />
    ))
  );
};

const mapStateToProps = (state: any) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
