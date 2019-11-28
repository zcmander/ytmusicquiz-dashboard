import { combineReducers } from 'redux';

import { dashboardReducer } from './dashboardReducer';

export const rootReducer = combineReducers({
    dashboard: dashboardReducer
});

export type RootState = ReturnType<typeof rootReducer>