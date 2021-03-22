// client socket emits n such
import {
    socket,
    url,
    styles,
    signInModal,
    scMessageInput,
    mdlScreenNameInput,
    userInfo,
    sidechatInvite,
    sendButton,
    signinInfo,
    mainchatOutputContainer
} from "./signin-modal.js";
const p = console.log;


// socket.on('introducing...',(data)=>{
//  mainchatOutputContainer.innerHTML +=`
//      <i><div class="intro-message">${data.screenname}<span> has joined the chat</span></div></i>
//  `
// })

sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (scMessageInput.value.length > 3) {
        socket.emit('message.chat', {
            screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
            message: scMessageInput.value
        })
    }
})

socket.on('chat', (data) => {

    mainchatOutputContainer.innerHTML += `
        <a href="" class="user-link">${data.screenname}</a>
        <div class="message-sent" >${data.message}</div>
    `;
    var links = Array.from(document.getElementsByClassName("user-link"));

    links.forEach((link) => {
        link.addEventListener("click", function(e) {
            let screenname = link.innerHTML;
            e.preventDefault();

            socket.emit('getid')
            socket.emit('message-invite', {
                sender: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
                senderid: socket.id,
                receiver: screenname
            })
        })
    })
})
socket.on('invite', ((data) => {
    console.log(`${data.sender} would like to chat with you.`);
    // sidechatInvite.classList.remove('hide');
    mainchatOutputContainer.innerHTML += `
            <!----------------------- SIDECHAT INVITE ----------------------->
        <div class="sidechat-invite" id="sidechat-invite">
            <div class="sidechat-invite--shadow-layer"></div>
            <div class="sidechat-invite--window ">
                Would you like to chat with ${data.sender}?
                <div class="sidechat-button ">
                    <div class="sidechat-button--yes" id="yes">random yes</div>
                    <div class="sidechat-button--no" id="no">random no</div>
                </div>
                
            </div>

        </div>
        `
    let yes = document.getElementById("yes");
    let no = document.getElementById("no");

    yes.addEventListener("click", () => {
        function registerLink(screenname) {
            socket.emit('register', {
                // id: screenname
                id: data.sender
            })
        }
        registerLink(data.sender);
        document.querySelector('#sidechat-invite').classList.add('hide');
        socket.emit('invite-acceptance', {
            reciever: data.sender  
            //  ^^^^^
        })
        window.open(`../users/${data.sender}.html`);
    })
    no.addEventListener("click", () => {
        alert('no')
    })
}))
socket.on('accept-join',(data)=>{
    // window.open(`../users/${data.sender}.html`);
    console.log(data.screenname)
})

//USE ONLY ON SIDECHATS
socket.on('typing', (data) => {
    p(`${data.screenname} is typing...`);
})

// export {sendMessage};