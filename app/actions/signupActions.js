import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';

import { updateRoute } from '../helpers/routerHelper';
import { postRequest } from '../utils/api';
import { updateJWT } from '../utils/user';
import { loadUserProfile } from './loadUserProfileAction';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function signUp(profileType, userData) {
  if (userData.password.first === userData.password.second) {
    return dispatch => {
      dispatch(setProgressModelState(true));
      postRequest('signup_post', userData, { profileType: profileType })
        .then(res => {
          const { token, refresh_token } = res.data;
          updateJWT(token, refresh_token);
          dispatch(loadUserProfile());
        })
        .then(() => {
          NotificationManager.success(
            'Registration Successful',
            'Congrats',
            5000
          );
          updateRoute('app_userHome', dispatch);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          console.log(err);
          dispatch(setProgressModelState(false));
        });
    };
  } else {
    window.alert('Password do not match');
  }
}
