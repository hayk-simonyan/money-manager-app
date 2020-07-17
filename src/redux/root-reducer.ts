import { combineReducers } from 'redux';

import auth from './auth/auth.reducers';
import accounts from './accounts/account.reducers';
import alerts from './alerts/alert.reducers';

export default combineReducers({ auth, accounts, alerts });
