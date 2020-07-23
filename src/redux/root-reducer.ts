import { combineReducers } from 'redux';

import auth from './auth/auth.reducers';
import accounts from './accounts/account.reducers';
import alerts from './alerts/alert.reducers';
import categories from './categories/category.reducers';

export default combineReducers({ auth, accounts, alerts, categories });
