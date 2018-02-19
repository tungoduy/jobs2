const admin = require('firebase-admin');
const twilio = require('./twilio');
const standartlizePhoneNumber = require('./sharedFunctions');

module.exports = function(req, res) {

    // Check if user provided a phone number
    if (!req.body.phone) {
        return res.status(422).send({ error: 'You must provide a phone number.'});
    }

    // Nomarlize a phone string to remove non degits and parens
    const phone = standartlizePhoneNumber(req.body.phone);
    
    // Get user record
    admin.auth().getUser(phone)
        .then(userRecord => {
            // Generate a code from 1000 to 9999
            const code = Math.floor(Math.random() * 8999 + 1000);

            twilio.messages.create({
                body: 'Your code is: ' + code,
                to: phone,
                from: "+19477770090"
            }, (err) => {
                // If there are any errors
                if (err) { return res.status(422).send(err)}

                // Save the code to DB if there is no error
                admin.database().ref('/users/' + phone)
                    .update({ code, codeValid: true }, (err) => {
						if (err) {
							return res.status(422).send(err);
						}
						
						return res.send('OK');
                    })
            });
        })
        .catch((err) => {
            // // In Production
            // return res.status(422).send({ error: 'User not found.' });

            return res.status(422).send({ error: err });
        });
}