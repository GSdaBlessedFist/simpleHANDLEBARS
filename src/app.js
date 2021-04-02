//adding "validateMessage,async" to line 23
const express = require('express');
const app = express();
const fs = require('fs');
const path = require("path");
const hbs = require("hbs");
const socket = require('socket.io');
// const templatisize = require('./template.js');
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

hbs.registerHelper("Color",function(){
       			return "red";
       		})
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
		console.log("Introducing..."+data.screenname)
		console.log(currentUsers)
	})

	socket.on('message.chat',(data)=>{//<---
		console.log(data)
		// currentUsers.forEach(function(user){})
		
		io.sockets.emit('chat',{
			screenname: data.screenname,
			message: data.message
		});
	})

	socket.on('register', (data) => {
        let senderOfInvite = data.senderOfInvite;
        let receiverOfInvite = data.receiverOfInvite;
        let senderOfInviteId = data.senderOfInviteId;
        let ns = io.of(`/${senderOfInvite}`);

        // fs.appendFile(`./public/users/${senderOfInvite}.html`, templatisize(senderOfInvite,receiverOfInvite,nameofApp), function(err) {
        //     if (err) throw err;
        //     console.log(`${isenderOfInvite}.html created`);
        //     return;
        // });
        console.log(senderOfInvite,senderOfInviteId,receiverOfInvite)
        

        
        app.get('/sidechat',(req, res)=>{
        	res.render('sidechat',{
        		senderOfInvite,
        		senderOfInviteId ,
        		receiverOfInvite,
        		// receiverOfInviteId: ,
        		title: nameofApp
       		})
        
	        ns.on('message.chat',(data)=>{
	        	console.log(data)
			// currentUsers.forEach(function(user){})
			
			// ns.sockets.emit('chat',{
			// ns.emit('chat',{
			// 	screenname: data.sender,
			// 	message: data.message
			// });
		})
    })



////////trying to get recipient chat sending out///////////////////////
        
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
		console.log(currentUsers)
		console.log(`${data.receiverOfInvite} has accepted a sidechat invite from ${data.senderOfInvite}` )
		function matchUserToSocket(){
			let targetUser = data.senderOfInvite;
			let found = currentUsers.find((user)=>{
				return user.screenname === targetUser;
			})
			return found;
		}
		io.to(matchUserToSocket().socketinfo).emit('accept-join',{
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

