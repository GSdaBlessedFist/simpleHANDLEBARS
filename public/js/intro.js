// const mainContainer = document.getElementById("main-container"),
//     signIn = document.getElementById("sign-in"),
//     nameRow = document.getElementById("name-section"),
//     screenName = document.getElementById("mdl-screenname-input"),
//     inputRow = document.getElementById("input-section"),
//     bottomHalf = document.getElementById("bottom-half"),
//     initInput = document.getElementById("initial-input"),
//     joinChat = document.getElementById("join-chat"),
//     chatAreaGrid = document.getElementById("chat-area-grid");





// ////////////////////SCREEN NAME//////////////////////////
// const randomDefaultUserNames = ["TypieTech",
//     "Cesars_Salad",
//     "Lazarus_Lu",
//     "Salazar_One",
//     "$$Bunny",
//     "Grimmace2020",
//     "Plot_Lover",
//     "Kill'em_with_wine-ness"
// ];
// const randomNameSelection = function() {
//     return randomDefaultUserNames[Math.floor(Math.random() * randomDefaultUserNames.length)];
// }
// screenName.placeholder = randomNameSelection();


// document.body.addEventListener("keyup", (e) => {
//     if (e.keyCode === 13) {

       
//         socket.emit("chat", {
//             message: message.value,
//             screenname: screenName.value || screenName.placeholder
//         })
//         message.value = "";
//         signIn.style.display = "none";

//         delete this.keysPressed[e.key];
//     }
// })

////////////////JOIN CHAT/////////////////////////////////////
joinChat.addEventListener('click', (e) => {

   
    socket.emit("chat", {
        message: message.value,
        screenname: screenName.value || screenName.placeholder
    })
    message.value = "";
    
})

