//Make CONNECTION
const url = "http://localhost:4000";
var socket = io.connect();

const mainChatWindow = document.getElementById("main-chat-window"),
	mainChatWindowTitle = document.getElementById("main-room-title"),
	sideChatWindowGrid = document.getElementById("side-chat-window-grid"),
	sideChatTopWindow = document.getElementById("side-chat-top"),
	sideChatBottomWindow = document.getElementById("side-chat-bottom"),
	message = document.getElementById("message"),
	sendButton = document.getElementById("send"),
	output = document.getElementById("output"),
	feedback = document.getElementById("feedback"),
	screenNameLink = document.getElementById("screen-name-link");
	

var numberofChatWindows = 1;





//EMIT EVENTs

sendButton.addEventListener("click", () => {
	console.log("click: send");
	socket.emit("chat", {
		message: message.value,
		screenname: screenName.value || screenName.placeholder
	})
	message.value="";

})
message.addEventListener("keypress", () => {
	socket.emit("typing", screenName.value || screenName.placeholder);
})
message.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
  	socket.emit("chat", {
		message: message.value,
		screenname: screenName.value || screenName.placeholder
	})
  	message.value="";
  	}
});

const closeButtonBottom = document.getElementById("close-button-container_bottom");
closeButtonBottom.addEventListener('click',(e)=>{
	
	sideChatWindowGrid.classList.remove("side-chat-grid-two-window-split");
	sideChatWindowGrid.classList.add("side-chat-grid-two-window-split-b2-one");
	chatAreaGrid.classList.add("side-chat-grid-two-window-split");
})



//LISTEN FOR SOCKET EVENTS
const messages = [""];
socket.on('chat', function(data) {
	output.innerHTML += `
		<div class="user-entry-container">
			<a href="#" class="user-entry-container--screen-name" id="screen-name-link" onclick="splitScreen()">${data.screenname}:</a></br>
			<div class="user-entry-container--message-output" style="scroll-snap-align:end;">${data.message}</div>
		</div>
		`;
	feedback.innerHTML = "";
	
	messages.push(message);
})

socket.on("typing", function(data) {
	feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})

socket.on("broadcast",function(data){
	console.log(data.numberOfClients)	
})




function splitScreen(data) {
	
	if (!chatAreaGrid.classList.contains("side-chat-grid-split")) {
		chatAreaGrid.classList.add("side-chat-grid-split");
		
		document.getElementById("chatting-with-top").innerHTML = `side chat with top`;
		document.getElementById("close-button-container_top").style.display="inline";
		numberofChatWindows++;
		console.log(numberofChatWindows)

		mainChatWindowTitle.classList.add("side-chat-main-title-shrink");
	}else if(chatAreaGrid.classList.contains("side-chat-grid-split")){
		sideChatWindowGrid.classList.remove("side-chat-grid-split");
		sideChatWindowGrid.classList.add("side-chat-grid-two-window-split");

		document.getElementById("chatting-with-bottom").innerHTML = `side chat with bottom`;
		document.getElementById("close-button-container_bottom").style.display="inline";
		numberofChatWindows++;
		console.log(numberofChatWindows)
	}else {return;}
}

