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
//////////////////////////////////////////////// 
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////////////////////////////////// 
socket.on('invite', ((data) => {
    var senderOfInvite = data.sender;
    var receiverOfInvite = data.receiver;

    console.log(`${senderOfInvite} would like to chat with you.`);

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
                // id: senderOfInvite
                id: data.sender,
                receiver: data.receiver
            })
        }
        registerLink(data.sender);

        document.querySelector('#sidechat-invite').classList.add('hide');
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        socket.emit('invite-acceptance', {
            senderOfInvite: senderOfInvite,
            receiverOfInvite: receiverOfInvite
            //  ^^^^^
        })
        console.log("sender: ".toUpperCase() +data.sender +" & receiver:".toUpperCase()+data.receiver)
        // window.open(`../users/${data.sender}.html`);
        window.open('./sidechat');
        console.log("sidechat page created");
    })
    no.addEventListener("click", () => {
        alert('no')
    })
}))
//////////////////////////////////////////////// 
/////////////////////////////////////////////
/////////////////////////////////////////////
socket.on('accept-join',(data)=>{

    console.log(data.receiverOfInvite + " has accepted your invitation.");

    mainchatOutputContainer.innerHTML += `
            <!----------------------- SIDECHAT INVITE ACCEPTANCE----------------------->
        <div class="sidechat-accept" id="sidechat-accept">
            <div class="sidechat-accept--shadow-layer"></div>
            <div class="sidechat-accept--window ">
                ${data.receiverOfInvite} has accepted your invitation.
                <div class="sidechat-button ">
                    <div class="sidechat-button--joinsidechat" id="joinsidechat">JOIN</div>
                </div>">JOIN</div>
                </div>
                
            </div>

        </div>
    `
    const joinsidechat = document.querySelector('#joinsidechat');
    joinsidechat.addEventListener("click",function(){
        document.querySelector("#sidechat-accept").classList.add('hide');
        // window.open(`../users/${data.senderOfInvite}.html`);
        window.open('./sidechat');
    })
    //

    
})
//////////////////////////////////////////////// 
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////////////////////////////////// 
//USE ONLY ON SIDECHATS
socket.on('typing', (data) => {
    p(`${data.screenname} is typing...`);
})

// export {sendMessage};