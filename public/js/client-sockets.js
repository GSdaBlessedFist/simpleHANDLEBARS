// client socket emits n such
import {socket,url,styles,signInModal,scMessageInput,mdlScreenNameInput,userInfo,sidechatInvite,sendButton,signinInfo,mainchatOutputContainer} from "./signin-modal.js";
const p = console.log;


// socket.on('introducing...',(data)=>{
// 	mainchatOutputContainer.innerHTML +=`
// 		<i><div class="intro-message">${data.screenname}<span> has joined the chat</span></div></i>
// 	`
// })

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

socket.on('chat', (data) => {

    mainchatOutputContainer.innerHTML += `
		<a href="" class="user-link">${data.screenname}</a>
		<div class="message-sent" >${data.message}</div>
	`;
    var links = Array.from(document.getElementsByClassName("user-link"));

    function registerLink(screenname) {
        socket.emit('register', {
            id: screenname,
        })
    }

    // links.forEach((link) => {
    //     link.addEventListener("click", function(e) {
    //         let screenname = link.innerHTML;
    //         e.preventDefault();

    //         registerLink(screenname);
    //         window.open(`../users/${screenname}.html`);
    //     })

    // })


    links.forEach((link) => {
        link.addEventListener("click", function(e) {
            let screenname = link.innerHTML;
            e.preventDefault();
            console.log(userInfo)//<-----here
            socket.emit('getid')
            socket.emit('message-invite',{
                sender: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
                senderid : socket.id,               
                receiver : screenname,
                receiverid: userInfo.socketinfo
            })
        })
    })

    socket.on('invite',((data)=>{
        // console.log("data.receiver");
        console.log(`${data.sender} would like to chat with you.`);
        // sidechatInvite.classList.remove('hide');
    }))

})

//USE ONLY ON SIDECHATS
socket.on('typing',(data)=>{
	p(`${data.screenname} is typing...`);
})

// export {sendMessage};