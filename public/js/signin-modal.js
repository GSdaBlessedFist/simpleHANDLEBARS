const url = "http://localhost:4000";
var socket = io.connect();

const mainContainer = document.getElementById("main-container"),
    mainChatSection = document.getElementById("main-chat-section"),
    mainChatTitleBar = document.getElementById("mainchat-titlebar"),
    mainChatMessageArea = document.getElementById("mainchat-message-area"),
    mainchatOutputContainer = document.getElementById("mainchat-output-container"),
    sideChat_1Section = document.getElementById("side-Chat_1-Section"),
    sideChat_2Section = document.getElementById("side-Chat_2-Section");
// mainChatTitleBar.style.display = "none";
mainChatTitleBar.style.opacity = 0;
mainChatMessageArea.style.opacity = 0;
mainchatOutputContainer.style.opacity = 0;

// mdl = modal
const signupModal = document.getElementById("signup-modal"),
    mdlScreenNameInput = document.getElementById("mdl-screenname-input"),
    mdlMessageInput = document.getElementById("mdl-message-input"),
    mdlJoinChatButton = document.getElementById("mdl-join-button");
mdlScreenNameInput.value = "";
mdlMessageInput.value = "";

// sc = send-component
const mainChatSendComponent = document.getElementById("mainchat-send-component"),
    scMessageInput = document.getElementById("sc-message-input"),
    sendButton = document.getElementById("sc-send-button");

const styles = getComputedStyle(document.documentElement);
const fadeOutTime = styles.getPropertyValue('--fadeOutTime');

const randomDefaultScreenNames = ["TypieTech", "Cesars_Salad", "Lazarus_Lu",
    "Salazar_One", "$$Bunny", "Grimmace2020",
    "Plot_Lover", "Kill'em_with_wine-ness"
];

const randomNameSelection = function() {
    return randomDefaultScreenNames[Math.floor(Math.random() * randomDefaultScreenNames.length)];
}

mdlScreenNameInput.placeholder = randomNameSelection();

document.body.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        // if (!mdlMessageInput.value) {
        //     alert("Please introduce yourself");
        //     return;
        // } else {
        //     socket.emit("chat", {
        //         screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
        //         message: mdlMessageInput.value
        //     })

        // }
          ///////////////////////////////////////////// DEVELOPMENT v.....PRODUCTION ^/////////////////////
            socket.emit("chat", {
                screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
                message: mdlMessageInput.value
            })

        signupModal.classList.add("goAway");
        setTimeout(function() {
            signupModal.classList.add("hide");
            mainChatSendComponent.classList.add("comingIn");
            mainChatTitleBar.classList.add("comingIn");
            mainChatMessageArea.classList.add("comingIn");
            mainchatOutputContainer.classList.add("comingIn");
        }, fadeOutTime)

        //delete this.keysPressed[e.key];
    }
})

mdlJoinChatButton.addEventListener("click", function() {
    if (!mdlMessageInput.value) {
        alert("Please introduce yourself");
        return;
    } else {
        socket.emit("chat", {
            screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
            message: mdlMessageInput.value
        })

    }

    signupModal.classList.add("goAway");
    setTimeout(function() {
        signupModal.classList.add("hide");
        mainChatSendComponent.classList.add("comingIn");
        mainChatTitleBar.classList.add("comingIn");
        mainChatMessageArea.classList.add("comingIn");
    }, fadeOutTime)

})


export {socket, url,scMessageInput,mdlScreenNameInput,sendButton};