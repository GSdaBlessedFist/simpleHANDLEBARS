//template.js


function templatisize(id,title){
	
	return `
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="../css/styles.css" />
		<title>Chatting with ${id}</title>
		<script src="https://cdn.socket.io/3.1.1/socket.io.min.js"></script>
	</head>
	<body>
		<div class="prime-container">
	        <div class="title-bar">
				<div class="title-bar--site-title "><div>${title}</div></div>
			    <div class="title-bar--darkmode-button"><a href="#">D</a></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			    <div class="title-bar--spacer"></div>
			</div>
	<!------------------------------------------->
	    <div class="main-container" id="main-container">
			<div class="main-container--mainchat b" id="main-chat-section">
				<div class="mainchat--message-area b" id="mainchat-message-area">
					<div class="mainchat--message-area--titlebar" id="mainchat-titlebar">chatting with ${id}</div>
					<div class="mainchat--message-area--output-container " id="mainchat-output-container">
						<!-- TypieTech:                 -->
						<!--   This is a message         -->
						<!-- Lazarus_Lu:                 -->
						<!--   This is a message as wella-->
				</div>
			</div><!-- class="mainchat-message-area" -->

			<div class="send-component b" id="mainchat-send-component" style="opacity:1;">
				<div class="send-component--grid">
					<form action="#">
						<input type="text" name="message" class="sc-message-input" id="sc-message-input" placeholder="please type in a message" value="" required autofocus />
						<input type="submit" class="send-button" id="send-button" value="SEND"/>	
					</form>
				</div>
			</div><!------------------- class="send-component" -->

	<!------------------------------------------->
	    <div class="footer-bar">possibly inappropriate joke of the day</div>

	        </div><!-- class="prime-container" -->

	<script>
		const socket = io("'/"+${id}+"'");
		console.log("HERE")
		socket.on("connect",function(data){
			socket.emit("join","Hey from client");
					
		})
		
		sendButton.addEventListener("click",(e)=>{
			e.preventDefault();
	
			if(scMessageInput.value.length>3){
				socket.emit('message.chat',{
					screenname: mdlScreenNameInput.value || mdlScreenNameInput.placeholder,
					message:scMessageInput.value
				})
			}
		})

		socket.on('chat', (data) => {

    	mainchatOutputContainer.innerHTML += `
        	<a href="#" class="user-link">${data.sender}</a>
        	<div class="message-sent" >${data.message}</div>
    	`;
	</script>			
	</body>
</html>
`
}
module.exports = templatisize;