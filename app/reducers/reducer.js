import { combineReducers } from 'redux';
import commonReducers from './commonReducers';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authenticationReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import entitiesReducer from './entitiesReducer';
import sideNavReducer from './sideNavReducer';

export default combineReducers({
  ...commonReducers,
  form: formReducer,
  entities: entitiesReducer,
  authentication: authenticationReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  sideNav: sideNavReducer,
  mediaPath: (state = {}) => state
});
