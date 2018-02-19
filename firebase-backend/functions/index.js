const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./src/create_user');
const serviceAccount = require('./src/service_account.json');
const requestOTP = require('./src/request_one_time_password');
const verifyOTP = require('./src/verifying_one_time_password');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-6fecd.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);
