const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
    res.send("Lets go");
});
app.get('/deposit-withdraw/:option/:userID/:accountName/:amount', function(req, res) {
    var paramsObj = {
        option:req.params["option"],
        userId:req.params["userID"],
        accountName:req.params["accountName"],
        amount:req.params["amount"]
    }
    if(req.params["option"] !== "w" && req.params["option"] !== "d"){
        res.redirect("/error/1/1")
    }else{
        res.json({"responseObj":paramsObj})
    }
    
});
app.get('/peerTopeer/:userIdTo/:userIdFrom/:amount', function(req, res) {
    var paramsObj = {
        option:req.params["option"],
        userId:req.params["userID"],
        accountName:req.params["accountName"],
        amount:req.params["amount"]
    }
    res.json({"responseObj":paramsObj})});
app.get('/error/:code/:location', function(req, res) {
    var location = "";
    if(req.params["location"] == "1"){
        location = "/deposit-withdraw/:option/:userID/:accountName/:amount";
    }
    switch(req.params["code"]){
        case "1":
            res.json({"status":"error","message":"Invalid :option","location":location});
            break;
        case "2":
            res.json({"status":"error","message":"Error Code two"});
            break;
        default:
            res.json({"status":"error","message":"Error unknown"});

    }
});



app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is on ');
});