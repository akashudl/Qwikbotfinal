import {CognitoUserPool} from 'amazon-cognito-identity-js';
   

export const AWSConfig
{
AWS.config.region = 'us-east-1'; // Region
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		// Provide your Pool Id here
			IdentityPoolId: 'us-east-1:0df49fd7-b959-4355-bc85-10fa0206de30',
		});
}
		var lexruntime = new AWS.LexRuntime();
		var lexUserId = 'chatbot-demo' + Date.now();
		var sessionAttributes = {};