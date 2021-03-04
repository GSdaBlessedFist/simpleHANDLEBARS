// client socket emits n such
import {socket,url,scMessageInput,mdlScreenNameInput,sendButton,signinInfo} from "./signin-modal.js";
const p = console.log;


function join(chatInfo){
	socket.emit('hello',chatInfo);
	console.log(chatInfo);	
}
// console.log(scMessageInput.value);
// scMessageInput.addEventListener("keypress", () => {
// 	socket.emit("typing", chatInfo.screenname);
// })
socket.on('typing',(data)=>{
	p(`${data.screenname} is typing...`);
})

export {join};