import { combineReducers } from 'redux';

import accounts from './accounts/account.reducers';
import auth from './auth/auth.reducers';

export default combineReducers({ auth, accounts });
