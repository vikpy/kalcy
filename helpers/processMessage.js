
//Dialog flow access token 
const API_AI_TOKEN  =  "";   //API Client Token 
const apiAiClient  = require('apiai')(API_AI_TOKEN);

//Facebook access token 
const FACEBOOK_ACCESS_TOKEN = "";
const request  = require('request') ;

//Using Request to send request to facebook, check out the json message that is sent to the facebook
const sendTextMessage  = (senderID, text) => {
    var requestMessage  = {
        url : 'https://graph.facebook.com/v2.6/me/messages',
        //Query String 
        qs : { access_token: FACEBOOK_ACCESS_TOKEN },
        method : 'POST',
        json : {
            recipient : { id : senderID },
            message : { text }
        }
    };
    request(requestMessage);
};

//API AI sender 
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
   const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'kalcy'});
   apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
   sendTextMessage(senderId, result);
    });
   apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
   };
