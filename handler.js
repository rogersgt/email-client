'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  region: process.env.REGION,
});

module.exports.sendEmail = (event, context, callback) => {
  // Incoming data about the email.
  const { message, name, email, subject } = JSON.parse(event.body);

  // Confirm that the incoming data is what we expect.
  const invalidRequest = typeof message !== 'string' || typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string';

  const badEnvVars = !!process.env.RECIPIENT_EMAIL || !!process.env.REGION || !!process.env.SENDER_EMAIL;
  
  if (invalidRequest) {
    callback(new Error('Invalid arguments in the event.'));
    return;
  } else if (badEnvVars) {
    callback(new Error('Please provide RECIPIENT_EMAIL, SENDER_EMAIL, and REGION environment variables.'))
  }

  const params = {
    Destination: {
      ToAddresses: [
        process.env.RECIPIENT_EMAIL,
      ],
    },
    Message: {
      Body: {
        Text: {
          Data: `${message} \nPlease respond to: ${name} \n${email}`
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: process.env.SENDER_EMAIL,
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
