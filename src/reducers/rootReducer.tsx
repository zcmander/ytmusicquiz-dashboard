import { combineReducers } from 'redux';

import { connectionReducer } from './connectionReducer';
import { dashboardReducer } from './dashboardReducer';

export const rootReducer = combineReducers({
    connection: connectionReducer,
    dashboard: dashboardReducer
});

export type RootState = ReturnType<typeof rootReducer>