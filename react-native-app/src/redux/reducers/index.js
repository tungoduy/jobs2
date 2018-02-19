import { combineReducers } from 'redux';
import ScreenReducer from './ScreenReducer';
import AuthReducer from './AuthReducer';
import JobReducer from './JobReducer';
import LikeJobReducer from './LikeJobReducer';
import OTPReducer from './OTPReducer';

export default combineReducers({
    nextScreen: ScreenReducer,
    auth: AuthReducer,
    jobs: JobReducer,
    likedJobs: LikeJobReducer,
    OTP: OTPReducer
});
