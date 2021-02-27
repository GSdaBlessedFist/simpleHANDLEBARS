//adding "validateMessage,async" to line 23
const express = require('express');
const path = require("path");
const hbs = require("hbs");
const socket = require('socket.io');

const app = express();
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

const nameofApp = "chatty app";


app.get("",(req,res)=>{
        res.render("index",{
                title: nameofApp
        })
})

// SOCKET SETUP
var io = socket(server);

var clients = 0;
////////////////////// DEFAULT NAMESPACE ////////////////////
io.on('connection',function(socket){
	console.log("made connection",socket.id)
	clients = clients +1;

	socket.on('hello',function(data){
		clients++;
		console.log(`${data.screenname} adds one more, bringing the count to ${clients}`)
		
	})




	socket.on("typing",(data)=>{
		socket.broadcast.emit("typing",`${data.screenname}is typing...`);
	})




	socket.on("disconnect",()=>{
		clients--;
		let clientStatement="";
		if(clients>=1){
			clientStatement = `There are ${clients} people are still connected.` 
		}else{
			clientStatement = `Only 1 person is in here...and that's you.`;
		}
		io.sockets.emit("broadcast",{
			numberOfClients: clientStatement
		})
	})
})
//////////////////// SECOND CHATROOM NAMESPACE //////////////////

