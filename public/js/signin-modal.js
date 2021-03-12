// import {sendMessage} from "./client-sockets.js";
const url = "http://localhost:4000";
const socket = io.connect();

const mainContainer = document.getElementById("main-container"),
    mainChatSection = document.getElementById("main-chat-section"),
    mainChatTitleBar = document.getElementById("mainchat-titlebar"),
    mainChatMessageArea = document.getElementById("mainchat-message-area"),
    mainchatOutputContainer = document.getElementById("mainchat-output-container");
    // sideChat_1Section = document.getElementById("side-Chat_1-Section"),
    // sideChat_2Section = document.getElementById("side-Chat_2-Section");

mainChatTitleBar.style.opacity = 0;
mainChatMessageArea.style.opacity = 0;
mainchatOutputContainer.style.opacity = 0;

// mdl = modal
const signInModal = document.getElementById("signin-modal"),
    mdlScreenNameInput = document.getElementById("mdl-screenname-input"),
    mdlJoinChatButton = document.getElementById("mdl-join-button");

// sc = send-component
const mainChatSendComponent = document.getElementById("mainchat-send-component"),
    scMessageInput = document.getElementById("sc-message-input"),
    sendButton = document.querySelector(".send-button");

const styles = getComputedStyle(document.documentElement);
const fadeOutTime = styles.getPropertyValue('--fadeOutTime');

const randomDefaultScreenNames = ["TypieTech", "Cesars_Salad", "Lazarus_Lu",
    "Salazar_One", "$$Bunny", "Grimmace2020",
    "Plot_Lover", "Kill'em_with_wine-ness"
];

const randomNameSelection = function() {
    return randomDefaultScreenNames[Math.floor(Math.random() * randomDefaultScreenNames.length)];
}

var signinInfo = {};
mdlScreenNameInput.placeholder = randomNameSelection();
// signinInfo.screenname = randomNameSelection() || mdlScreenNameInput.value;
// signinInfo.message = mdlMessageInput.value || "Testing purposes only as requirement will be needed";

document.body.addEventListener("keyup", (e) => {

    if (e.keyCode === 13) {
        socket.emit("intro", {
            screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder
        })

        signInModal.classList.add("goAway");
        setTimeout(function() {
            signInModal.classList.add("hide");
            mainChatSendComponent.classList.add("comingIn");
            mainChatTitleBar.classList.add("comingIn");
            mainChatMessageArea.classList.add("comingIn");
            mainchatOutputContainer.classList.add("comingIn");
            scMessageInput.value = "";
            scMessageInput.placeholder = "what's on your brain...?";
        }, fadeOutTime)

    }
    
    
})

mdlJoinChatButton.addEventListener("click", function() {
    socket.emit("intro", {
        screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder
    })

    signInModal.classList.add("goAway");
    setTimeout(function() {
        signInModal.classList.add("hide");
        mainChatSendComponent.classList.add("comingIn");
        mainChatTitleBar.classList.add("comingIn");
        mainChatMessageArea.classList.add("comingIn");
        mainchatOutputContainer.classList.add("comingIn");
        scMessageInput.value = "";
        scMessageInput.placeholder = "say it...";
    }, fadeOutTime)

    console.log(scMessageInput.value);

})



export {
    socket,
    url,
    styles,
    signInModal,
    scMessageInput,
    mdlScreenNameInput,
    sendButton,
    signinInfo,
    mainchatOutputContainer
};