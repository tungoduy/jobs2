const admin = require('firebase-admin');
const standartlizePhoneNumber = require('./sharedFunctions');

module.exports = function(req, res) {

    // Verify the user provided a phone
    if (!req.body.phone) {
        return res.status(422).send(req.body);
    }

    // Format the phone number to replace dashes and parens
    const phone = standartlizePhoneNumber(req.body.phone);

    // Create a new user account using the phone number
    admin.auth().createUser({ uid: phone })
        .then(user => res.send(user) )
        .catch(err => res.status(422).send({ error: err }));
    // Respond to the user request, saying the account was made

}