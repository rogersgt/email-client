## email-client
A very basic AWS microservice to handle the sending of emails.

### Usage
The API only exposes one POST method: https://mnyhqc80e9.execute-api.us-east-1.amazonaws.com/dev/sendEmail

The request should contain a JSON object with three keys:

```javascript
{
	"message": "Hey there- I have heard that you like wombats.",
	"email": "blake.guilloud@gmail.com",
	"name": "WombatGuy",
	"subject": "I must know"
}
```

#### Environment Variables
Include the following in a `.env` file in the working directory.
- SENDER_EMAIL
		The SES registered email that will be sending the email.
- RECIPIENT_EMAIL
		The email address that will be receiving the email.
- REGION
		The AWS region to deploy the serverless resources in (i.e. us-east-1, us-west-2, ...).
