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
                title: nameofApp
        })
})

// SOCKET SETUP
var io = socket(server);

var clientNum = 0;

////////////////////// DEFAULT NAMESPACE ////////////////////
io.on('connection',function(socket){
	var currentUsers = [];
	console.log("made connection",socket.id)
	clientNum++;

	
	socket.on('message.chat',(data)=>{

		

		function addUser(data){
			if(currentUsers.includes(data.screenname)){
				currentUsers.push({user:data.screenname,id:socket.id});
				console.log(currentUsers + "users")
			}else{return};
		}
		addUser(data);
		

		io.sockets.emit('chat',{
			screenname: data.screenname,
			message: data.message
		});
	})

	// socket.on('register', (data) => {
 //        let id = data.id;
 //        let ns = io.of(`/${id}`);

 //        fs.appendFile(`./public/users/${id}.html`, templatisize(id,nameofApp), function(err) {
 //            if (err) throw err;
 //            console.log(`${id}.html created`);
 //            return;
 //        });
	// })
	socket.on('message-invite',(data)=>{
		// search of record in currentUsers
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^HERE		
		
		io.to(data.userid).emit('invite',data);
	})
		








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

