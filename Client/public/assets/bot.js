document.getElementById("wisdom").focus();

		// Initialize the Amazon Cognito credentials provider
		AWS.config.region = 'us-east-1'; // Region
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		// Provide your Pool Id here
			IdentityPoolId: 'us-east-1:0df49fd7-b959-4355-bc85-10fa0206de30',
		});

		var lexruntime = new AWS.LexRuntime();
		var lexUserId = 'chatbot-demo' + Date.now();
		var sessionAttributes = {};

		function pushChat() {

			// if there is text to be sent...
			var wisdomText = document.getElementById('wisdom');
			if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {

				// disable input to show we're sending it
				var wisdom = wisdomText.value.trim();
				wisdomText.value = 'Please Wait Bot Responding ...';
				wisdomText.locked = true;

				// send it to the Lex runtime
				var params = {
					botAlias: '$LATEST',
					botName: 'qc_sre',
					inputText: wisdom,
					userId: lexUserId,
					sessionAttributes: sessionAttributes
				};
				showRequest(wisdom);
				lexruntime.postText(params, function(err, data) {
					if (err) {
						console.log(err, err.stack);
						showError('Error:  ' + err.message + ' (see console for details)')
					}
					if (data) {
						// capture the sessionAttributes for the next cycle
						sessionAttributes = data.sessionAttributes;
						// show response and/or error/dialog status
						showResponse(data);
					}
					// re-enable input
					wisdomText.value = '';
					wisdomText.locked = false;
				});
			}
			// we always cancel form submission
			return false;
		}

		function showRequest(daText) {

			var conversationDiv = document.getElementById('conversation');
			var requestPara = document.createElement("P");
			var img = document.createElement('img');
			var container = document.createElement('div');
			img.src = "https://image.flaticon.com/icons/png/512/17/17004.png"
			img.className = 'imguser';
			requestPara.className = 'userRequest';				
			requestPara.appendChild(document.createTextNode(daText));
			/*conversationDiv.appendChild(img);
			conversationDiv.appendChild(requestPara);
			conversationDiv.appendChild(document.createElement("br"));
			conversationDiv.appendChild(document.createElement("br"));*/
			container.appendChild(img);
			container.appendChild(requestPara);
			conversationDiv.appendChild(container);
			conversationDiv.scrollTop = conversationDiv.scrollHeight;
		}

		function showError(daText) {

			var conversationDiv = document.getElementById('conversation');
			var errorPara = document.createElement("P");
			var img = document.createElement('img');
			var container = document.createElement('div');
			container.className = 'single';
			img.src = "https://studio.code.org/v3/assets/IVcViIhtoIH8ppAOwI8_4aJTAem8NlIIfMN1F1vheog/uokpl.rs-youtube-like-png-4207804.png"
			img.className = 'imgerr';
			errorPara.className = 'lexError';
			errorPara.appendChild(document.createTextNode(daText));			
			/*conversationDiv.appendChild(img);
			conversationDiv.appendChild(errorPara);
			conversationDiv.appendChild(document.createElement("br"));
			conversationDiv.appendChild(document.createElement("br"));*/
			container.appendChild(img);
			container.appendChild(errorPara);
			conversationDiv.appendChild(container);
			conversationDiv.scrollTop = conversationDiv.scrollHeight;
		}

		function showResponse(lexResponse) {

			var conversationDiv = document.getElementById('conversation');
			var responsePara = document.createElement("P");			
			var img = document.createElement('img');
			var container = document.createElement('div');
			container.className = 'single';
			img.src = "https://studio.code.org/v3/assets/IVcViIhtoIH8ppAOwI8_4aJTAem8NlIIfMN1F1vheog/uokpl.rs-youtube-like-png-4207804.png"
			img.className = 'imgresp';
			responsePara.className = 'lexResponse';
			if (lexResponse.message) {
				responsePara.appendChild(document.createTextNode(lexResponse.message));
			}
			if (lexResponse.dialogState === 'ReadyForFulfillment') {
				responsePara.appendChild(document.createTextNode(
					'Ready for fulfillment'));
				// TODO:  show slot values
			} else {
				responsePara.appendChild(document.createTextNode(
					''));
					//'(' + lexResponse.dialogState + ')'));
			}			
			/*conversationDiv.appendChild(img);
			conversationDiv.appendChild(responsePara);
			conversationDiv.appendChild(document.createElement("br"));
			conversationDiv.appendChild(document.createElement("br"));*/
			container.appendChild(img);
			container.appendChild(responsePara);
			conversationDiv.appendChild(container);
			conversationDiv.scrollTop = conversationDiv.scrollHeight;
		}