## email-client
A very basic AWS microservice to handle the sending of emails.

### Usage
The API only exposes one POST method: https://mnyhqc80e9.execute-api.us-east-1.amazonaws.com/dev/sendEmail

The request should contain a JSON object with three keys:

```javascript
{
	"message": "Hey there- I have heard that you like wombats.",
	"email": "blake.guilloud@gmail.com",
	"name": "WombatGuy"
}
```
