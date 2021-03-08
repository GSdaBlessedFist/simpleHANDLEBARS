// client socket emits n such
import {socket,url,styles,signInModal,scMessageInput,mdlScreenNameInput,sendButton,signinInfo,mainchatOutputContainer} from "./signin-modal.js";
const p = console.log;


socket.on('introducing...',(data)=>{
	mainchatOutputContainer.innerHTML +=`
		<i><div class="intro-message">${data.screenname}<span> has joined the chat</span></div></i>
	`
})

sendButton.addEventListener("click",(e)=>{
	e.preventDefault();
	
	if(scMessageInput.value.length>3){
		console.log(scMessageInput.value);
		socket.emit('message.chat',{
			screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
			message:scMessageInput.value
		})
	}
	
})

socket.on('chat',(data)=>{
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