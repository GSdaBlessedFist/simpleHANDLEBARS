// client socket emits n such
import {socket,url,scMessageInput,mdlScreenNameInput,sendButton} from "./signin-modal.js";
const p = console.log;

socket.emit('joining',{
	screenname : mdlScreenNameInput.value
})

