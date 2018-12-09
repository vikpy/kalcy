module.exports  = (req, res)  => {
const hubChallenge = req.query['hub.challenge'];
const token = 'kalcy';
const hubMode  = req.query['hub.mode'];
const verifyTokenMatches = (req.query['hub.verify_token'] ==  token)


if(hubMode && verifyTokenMatches){
    res.status(200).send(hubChallenge);
} else {
    res.status(403).end();
}

};



