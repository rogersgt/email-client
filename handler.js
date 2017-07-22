'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  region: 'us-west-2',
});

module.exports.sendEmail = (event, context, callback) => {
  // Incoming data about the email.
  const { message, name, email } = JSON.parse(event.body);

  // Confirm that the incoming data is what we expect.
  const invalidRequest = typeof message !== 'string' || typeof name !== 'string' || typeof email !== 'string';
  
  if (invalidRequest) {
    callback(new Error('Invalid arguments in the event.'));

    return;
  }

  const params = {
    Destination: {
      ToAddresses: [
        'fbguillo@gmail.com',
      ],
    },
    Message: {
      Body: {
        Text: {
          Data: `Incoming email from: ${email}. ${name} would like to tell you: ${message}`,
        },
      },
      Subject: {
        Data: 'This is a really nice email.',
      },
    },
    Source: 'blake@rhinogram.com',
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      callback(new Error(`Your email did not send : ${err}`));
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Email send successfully!',
          input: event,
        }),
      };

      callback(null, response);
    }
  });
};
