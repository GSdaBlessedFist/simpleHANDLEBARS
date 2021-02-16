const mainContainer = document.getElementById("main-container"),
    signIn = document.getElementById("sign-in"),
    nameRow = document.getElementById("name-section"),
    screenName = document.getElementById("name-input"),
    inputRow = document.getElementById("input-section"),
    bottomHalf = document.getElementById("bottom-half"),
    initInput = document.getElementById("initial-input"),
    joinChat = document.getElementById("join-chat"),
    chatAreaGrid = document.getElementById("chat-area-grid");





////////////////////SCREEN NAME//////////////////////////
const randomDefaultUserNames = ["TypieTech",
    "Cesars_Salad",
    "Lazarus_Lu",
    "Salazar_One",
    "$$Bunny",
    "Grimmace2020",
    "Plot_Lover",
    "Kill'em_with_wine-ness"
];
const randomNameSelection = function() {
    return randomDefaultUserNames[Math.floor(Math.random() * randomDefaultUserNames.length)];
}
screenName.placeholder = randomNameSelection();

initInput.addEventListener("keydown", (e) => {
    message.value = initInput.value
})

document.body.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {

        joinChatRemoval();
        inputRowReposition();
        setTimeout(function() {
            inputRow.style.display = "none";
        }, inputRowRepositionTiming);

        screenNameRowReposition();
        setTimeout(function() {
            bottomHalf.style.display = "none";
        }, inputRowRepositionTiming)

        setTimeout(function() {
            mainChatWindowTitle.style.display = "block";
        }, inputRowRepositionTiming);

        initInput.value = output.value;
        sendButton.style.color = "white";
        sendButton.disabled = false;
        socket.emit("chat", {
            message: message.value,
            screenname: screenName.value || screenName.placeholder
        })
        message.value = "";
        signIn.style.display = "none";

        delete this.keysPressed[e.key];
    }
})

////////////////JOIN CHAT/////////////////////////////////////
joinChat.addEventListener('click', (e) => {

    joinChatRemoval();
    inputRowReposition();
    setTimeout(function() {
        inputRow.style.display = "none";
    }, inputRowRepositionTiming);

    screenNameRowReposition();
    setTimeout(function() {
        bottomHalf.style.display = "none";
    }, inputRowRepositionTiming)

    setTimeout(function() {
        mainChatWindowTitle.style.display = "block";
    }, inputRowRepositionTiming);

	initInput.value = output.value;
    sendButton.style.color = "white";
    sendButton.disabled = false;
    socket.emit("chat", {
        message: message.value,
        screenname: screenName.value || screenName.placeholder
    })
    message.value = "";
    signIn.style.display = "none";
})

var inputRowRepositionTiming = 425; //625;

var transitionOptions = {
    duration: inputRowRepositionTiming,
    iterations: 1,
    easing: "ease-out",
    fill: "forwards"
}

function inputRowReposition() {
    inputRow.animate([{
            transform: "translateY(0px)",
            opacity: 1
        },
        {
            transform: `translateY(${footerY}px)`,
            opacity: 0
        }
    ], transitionOptions);
    nameRow.style.zIndex = -200;
}

function screenNameRowReposition() {
    screenName.animate([{
            transform: "translateY(0px)",
            opacity: 1
        },
        {
            transform: "translateY(-70px)",
            opacity: 0
        }
    ], transitionOptions);
    screenName.style.zIndex = 0;
}

function joinChatRemoval() {
    joinChat.animate([{
            transform: "translateY(0px)",
            opacity: 1
        },
        {
            transform: "translateY(50px)",
            opacity: 0
        }
    ], {
        duration: inputRowRepositionTiming - 200,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
    })
    joinChat.style.display = "none";
    joinChat.style.zIndex = 0;
}

const resize = new ResizeObserver(adjustChatWindowHeight);
resize.observe(mainContainer);

function adjustChatWindowHeight(entries) {
    let mainC = entries[0].target;
    if (entries[0].contentRect.height < 700) {

        mainContainer.style.height = "50px";
    }

}