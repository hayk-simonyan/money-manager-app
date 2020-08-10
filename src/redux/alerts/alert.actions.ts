import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './alert.types';

export const setAlert = (msg: string, alertType: string) => (dispatch: any) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
