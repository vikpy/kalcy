const express = require('express') ;
const bodyParser = require('body-parser') ;
const app = express() ;
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended : true } ) );
//-----------------------Test Response message to test if the server is working-----------------//
// app.get('/', (req, res)=>{                                                                   //
//  //   console.log(`Hello Request #${ req.params.number}`);                                   //
//     res.send("Hello Dost!!");                                                                //
// });                                                                                          //
//----------------------------------------------------------------------------------------------//
app.listen( 3000, () => console.log(`Webhook server listening port ${3000}`) );


//Controller Code
const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
app.get('/', verificationController);
app.post('/', messageWebhookController);