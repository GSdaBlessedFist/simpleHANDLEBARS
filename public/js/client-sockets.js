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
	if(scMessageInput.value.length>3){
		socket.emit('message.chat',{
			screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
			message:scMessageInput.value
		})
		alert("Made it here")
	}else{
		return
	}
})

socket.on('message.chat',(data)=>{
	mainchatOutputContainer.innerHTML +=`
		<a href="" class="user-link">${data.screenname}</a>
		<div class="message-sent" >${data.message}</div>
	`;
})

//USE ONLY ON SIDECHATS
socket.on('typing',(data)=>{
	p(`${data.screenname} is typing...`);
})

// export {sendMessage};