// client socket emits n such
import {socket,url,styles,scMessageInput,mdlScreenNameInput,sendButton,signinInfo,mainchatOutputContainer} from "./signin-modal.js";
const p = console.log;

socket.on('introducing...',(data)=>{
	mainchatOutputContainer.innerHTML +=`
		<div class="message-sent" style="font-size: 1rem;">${data.screenname} <i>has join the room.</i></div>
	`
})

const sendMessage = function(){
	console.log("peroxide")
	// e.preventDefault();
}



socket.on('typing',(data)=>{
	p(`${data.screenname} is typing...`);
})

// export {join};