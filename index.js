const express = require('express');
const app = express();
const path = require('path');
const readline = require("readline");
var Seq = require("./seq.js")
var session = require('express-session');
const seq = new Seq("namee")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


app.use(session({
  secret: 'random string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


const auth = (req,res,next) =>{
  console.log("Authorization Check")
  if(req.session && req.session.connected && req.session.credentials){
    console.log("Session Found")
      next()
}else{
  console.log("Session not Found")
  res.redirect("/")
}}

app.get('/', function(req, res) {
    if(req.session){
        req.session.destroy()
    }
    res.send("Index")
    });
app.get('/init/:db/:username/:password/:host', function(req, res) {
    var paramsObj = {
        db:req.params["db"],
        username:req.params["username"],
        password:req.params["password"],
        host:req.params["host"]
    }
    
    const connectionStatus = seq.checkConnection(paramsObj)
    .then((connectionStatus) => {if(connectionStatus == true){
        req.session.connected = true;
        req.session.credentials = paramsObj
        res.json({"responseObj":req.session.credentials})
        }else{
            res.redirect('/error/2/2')
        }}
    );

    const populateDataWorld = seq.populateDataWorld(paramsObj)
    .then((populateDataWorld) => {if(populateDataWorld == true){
        console.log("Populated Databse")
        }else{
            res.redirect('/error/2/2')
        }}
    );
    });

app.get('/deposit-withdraw/:option/:userID/:accountName/:amount', auth, function(req, res) {
    var paramsObj = {
        option:req.params["option"],
        userId:req.params["userID"],
        accountName:req.params["accountName"],
        amount:req.params["amount"]
    }
    if(req.params["option"] !== "w" && req.params["option"] !== "d"){
        res.redirect("/error/1/1")
    }else if(req.params["option"] == "w"){
        const makeWithdraw = seq.makeWithdraw(paramsObj)
    .then((makeWithdrawStatus) => {if(makeWithdrawStatus == true){
        res.json({"responseObj":req.session.credentials})
        }else{
            res.redirect('/error/2/1')
        }}
    );
        //res.json({"responseObj":paramsObj})
    }
    
});
app.get('/peerTopeer/:userIdTo/:userIdFrom/:amount',auth, function(req, res) {
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
    }else if(req.params["location"] == "2"){
        location = "/init/:db/:username/:password/:host"
    }
    switch(req.params["code"]){
        case "1":
            res.json({"status":"error","message":"Invalid :option","location":location});
            break;
        case "2":
            res.json({"status":"error","message":"Unable to connect to db, check credentials","location":location});
            break;
        default:
            res.json({"status":"error","message":"Error unknown"});

    }
});



app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is on ');
});