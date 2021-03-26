//adding "validateMessage,async" to line 23
const express = require('express');
const app = express();
const fs = require('fs');
const path = require("path");
const hbs = require("hbs");
const socket = require('socket.io');
const templatisize = require('../src/template.js');
const chalk = require('chalk');

var userCount = 0;

const port = process.env.PORT || 4000;
const server = app.listen(port,function(){
	console.log(`listening on port ${port}`);
})

app.use(express.static('public'));


// Express config
const publicDirectory = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

const nameofApp = "Chatap";

app.get("",(req,res)=>{
    res.render("index",{
            title: nameofApp,
            clientname: clientName
    })
})

var clientName = ""
//    ^
//    |
// SOCKET SETUP
var io = socket(server);

var clientNum = 0;
var currentUsers = [];
////////////////////// DEFAULT NAMESPACE ////////////////////
io.on('connection',function(socket){
	
	clientNum++;

	socket.on('add-client',(data)=>{
		// avoid duplicate entries  <--------------------------------
		currentUsers.push(data);
	})

	socket.on('message.chat',(data)=>{
		currentUsers.forEach(function(user){})
		
		io.sockets.emit('chat',{
			screenname: data.screenname,
			message: data.message
		});
	})

	socket.on('register', (data) => {
        let id = data.id;
        let ns = io.of(`/${id}`);

        fs.appendFile(`./public/users/${id}.html`, templatisize(id,nameofApp), function(err) {
            if (err) throw err;
            console.log(`${id}.html created`);
            return;
        });
////////trying to get recipient chat sending out///////////////////////
        socket.on('message.chat',(data)=>{
		currentUsers.forEach(function(user){})
		
		// ns.sockets.emit('chat',{
		ns.emit('chat',{
			screenname: data.sender,
			message: data.message
		});
	})
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////       
	})
	socket.on('message-invite',(data)=>{
		//.sender,.senderid,.receiver
		function matchUserToSocket(){
			let targetUser = data.receiver;
			let found = currentUsers.find((user)=>{
				return user.screenname === targetUser;
			})
			return found;
		}

		io.to(matchUserToSocket().socketinfo).emit('invite',data);
	})
		
	socket.on('invite-acceptance',(data)=>{
		console.log(`${data.receiverOfInvite} has accepted a sidechat invite from ${data.senderOfInvite}` )
		socket.emit('accept-join',{
			receiverOfInvite: data.receiverOfInvite,
			senderOfInvite: data.senderOfInvite
		})
	})


/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////



	socket.on("typing",(data)=>{
		socket.broadcast.emit("typing",`${data.screenname}is typing...`);
	})

	socket.on("disconnect",()=>{
		clientNum--;
		let clientStatement="";
		if(clientNum>=1){
			clientStatement = `There are ${clientNum} people are still connected.` 
		}else{
			clientStatement = `Only 1 person is in here...and that's you.`;
		}
		io.sockets.emit("broadcast",{
			numberOfClients: clientStatement
		})
	})
})
//////////////////// SECOND CHATROOM NAMESPACE //////////////////

