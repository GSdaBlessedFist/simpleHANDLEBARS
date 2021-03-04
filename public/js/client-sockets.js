// client socket emits n such
import {socket,url,styles,scMessageInput,mdlScreenNameInput,sendButton,signinInfo,mainchatOutputContainer} from "./signin-modal.js";
const p = console.log;


function join(chatInfo){
	socket.emit('hello',chatInfo);
	console.log(chatInfo);	
}
// console.log(scMessageInput.value);
// scMessageInput.addEventListener("keypress", () => {
// 	socket.emit("typing", chatInfo.screenname);
// })
socket.on('introducing...',(data)=>{
	mainchatOutputContainer.innerHTML = `
		<a href="#" class="user-link">${data.screenname}:</a>
		<div class="message-sent">${data.message}</div>
	`
})

socket.on('typing',(data)=>{
	p(`${data.screenname} is typing...`);
})

export {join};