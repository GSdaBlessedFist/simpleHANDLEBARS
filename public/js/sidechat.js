const socket = io(`/${data.id}`);

console.log("HERE")
socket.on("connect", function(data) {
    socket.emit("join", "Hey from client");

})

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
    	<a href="#" class="user-link">${data.sender}</a>
        <div class="message-sent" >${data.message}</div>
    `;
})