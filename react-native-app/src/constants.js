// Map screen name
export const WELCOME_SCREEN = 'Welcome';
export const AUTH_SCREEN = 'Auth';
export const JOBS_SCREEN = 'Jobs';
export const MAP_SCREEN = 'Map';
export const REVIEW_SCREEN = 'Review';
export const SETTINGS_SCREEN = 'Settings';
export const STARTING_SCREEN = 'Starting';


// Redux properties
// Actions
export const CHANGE_SCREEN = 'change_screen';
export const PASSED_WELCOME = 'passed_welcome2';
export const FB_TOKEN = 'fb_token';
export const PASSED_WELCOME_SUCCESS = 'passed_welcome_success';
export const PASSED_WELCOME_FAIL = 'passed_welcome_fail';
export const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success';
export const FACEBOOK_LOGIN_FAIL = 'facebook_login_fail';
export const FETCH_JOBS_SUCCESS = 'fetch_jobs_success';
export const FETCH_JOBS_FAIL = 'fetch_jobs_fail';
export const LIKE_JOB = 'like_job';
export const JOB_UNIQUE_KEY = 'jobkey';
export const DELETE_LIKED_JOB = 'delete_liked_job';
export const CLEAR_ALL_LIKED_JOBS = 'clear_all_liked_jobs';
export const CLEAR_ASYNC_STORAGE_SUCCESS = 'clear_async_storage_success';
export const SOCIAL_ICON_SIZE = 50;
const FIREBASE_ROOT_URL = 'https://us-central1-one-time-password-6fecd.cloudfunctions.net';
export const FIREBASE_FN_CREATE_USER = FIREBASE_ROOT_URL + '/createUser';
export const FIREBASE_FN_REQUEST_OTP = FIREBASE_ROOT_URL + '/requestOTP';
export const FIREBASE_FN_VERIFY_OTP = FIREBASE_ROOT_URL + '/verifyOTP';
export const OTP_SIGN_UP_SUCCESS = 'otp_sign_up_success';
export const OTP_SIGN_UP_FAIL = 'otp_sign_up_fail';
export const OTP_REQUEST_SUCCESS = 'otp_request_success';
export const OTP_REQUEST_FAIL = 'otp_request_fail';
export const OTP_LOGIN_SUCCESS = 'otp_login_success';
export const OTP_LOGIN_FAIL = 'otp_login_fail';
export const OTP_TOKEN = 'otp_token';

