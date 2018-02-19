const admin = require('firebase-admin');
const standartlizePhoneNumber = require('./sharedFunctions');

module.exports = function (req, res) {
    // Verify if user provided phone and code
    if (!req.body.phone || !req.body.code) {
        return res.status(422).send({error: 'You must provide your phone number and code.'});
    }

    // Remove NONE digits in phone string
    const phone = standartlizePhoneNumber(req.body.phone);
    const code = parseInt(req.body.code);

    // Get user first to check active user
    admin.auth().getUser(phone)
        .then(userRecord => {
            if(userRecord.disabled) {
                res.status(422).send({ error: 'Your account is disabled.'});
            }

            const ref = admin.database().ref('/users/' + phone);
            
            ref.on('value', snapshort => {
                ref.off();
                const userCode = snapshort.val();
                if(userCode.code !== code || !userCode.codeValid) {
                    res.status(422).send({ error: 'Your phone and code are not valid.'});
                }

                // Save the code as used
                ref.update({ codeValid: false });

                // Generate JWT
                admin.auth().createCustomToken(phone)
                    .then(token => res.send({ token }))
                    .catch(err => res.status(422).send({ error: err }));
            })
        })
        .catch(err => res.status(422).sned({ error: err }));

}