const url = "http://localhost:4000";
var socket = io.connect();

const mainContainer = document.getElementById("main-container"),
      mainChatSection= document.getElementById("main-chat-section"),
      sideChat_1Section=document.getElementById("side-Chat_1-Section"),
      sideChat_2Section=document.getElementById("side-Chat_2-Section");

// mdl = modal
const signupModal= document.getElementById("signup-modal"),
      mdlScreenNameInput = document.getElementById("mdl-screenname-input"),
      mdlMessageInput= document.getElementById("mdl-message-input"),
      mdlJoinChatButton= document.getElementById("mdl-join-button");
      mdlScreenNameInput.value ="";

// sc = send-component
const mainChatSendComponent= document.getElementById("mainchat-send-component"),
      scMessageInput= document.getElementById("sc-message-input"),
      scSendButton= document.getElementById("sc-send-button");

const styles = getComputedStyle(document.documentElement);
const fadeOutTime = styles.getPropertyValue('--fadeOutTime');

const randomDefaultScreenNames = ["TypieTech","Cesars_Salad","Lazarus_Lu",
    							"Salazar_One","$$Bunny","Grimmace2020",
    							"Plot_Lover","Kill'em_with_wine-ness"];

const randomNameSelection = function() {
    return randomDefaultScreenNames[Math.floor(Math.random() * randomDefaultScreenNames.length)];
}

mdlScreenNameInput.placeholder = randomNameSelection();

document.body.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if(mdlMessageInput.value.length<2){
            alert("Please introduce yourself");
            return;
        }else{
           socket.emit("chat", {
                screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
                message: mdlMessageInput.value
        })
        console.log(mdlScreenNameInput.value || mdlScreenNameInput.placeholder) 
        console.log(mdlMessageInput.value);
        }
       

        signupModal.classList.add("goAway");
        // message.value = "";
        // signIn.style.display = "none";

        // delete this.keysPressed[e.key];
    }
})