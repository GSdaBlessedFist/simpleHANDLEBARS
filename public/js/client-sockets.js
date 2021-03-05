// client socket emits n such
import {socket,url,styles,scMessageInput,mdlScreenNameInput,sendButton,signinInfo,mainchatOutputContainer} from "./signin-modal.js";
const p = console.log;

socket.on('introducing...',(data)=>{
	mainchatOutputContainer.innerHTML +=`
		<div class="message-sent" style="font-size: 1rem;">${data.screenname} <i>has join the room.</i></div>
	`
})

sendButton.addEventListener("click",(e)=>{
	e.preventDefault();
	if(scMessageInput.length>3){
		socket.emit('chat.message',{
			screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
			message:scMessageInput.value
		})
	}else{
		return;
	}
})
socket.on('chat',(data)=>{
	mainchatOutputContainer.innerHTML +=`
		<a href="">${data.screenname}</a>
		<div class="message-sent" >${data.message}</div>
	`;
})
socket.on('typing',(data)=>{
	p(`${data.screenname} is typing...`);
})

// export {sendMessage};