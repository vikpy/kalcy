
//Dialog flow access token 
const API_AI_TOKEN  =  "fb4530bbc1084c008c5ec520b695fc87";   //API Client Token 
const apiAiClient  = require('apiai')(API_AI_TOKEN);

//Facebook access token 
const FACEBOOK_ACCESS_TOKEN = "EAAEZBPOZAEGnsBANbjYgPUsg0gUcfCXwU5eqiK7YnIDkoidAyIcxafvRUmcUVepXqzQ2IloDpf0emOit3uLbZBx779IctZCRcHP4RU0gjmQxpB7zAhhUZAZAKhKutmKxLELquXTBCZAPhp4h4SXM6dTMtjrGMyrLrYBxL0sR5hbFxvPYSRkmtW5";
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
   const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
   apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
   sendTextMessage(senderId, result);
    });
   apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
   };