
// const server = require("./app.js");

// SOCKET SETUP
var io = socket(server);

var clients = 0;
////////////////////// DEFAULT NAMESPACE ////////////////////
io.on('connection',function(socket){
	console.log("made connection",socket.id)
	clients++;

	socket.on('joining',(data)=>{
		console.log(data)
	})




	socket.on("typing",(data)=>{
		socket.broadcast.emit("typing",data);
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



module.exports = { socket, io, clients};

