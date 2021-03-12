//template.js


function templatisize(id){
	return `
	<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Chatting with ${id}</title>
</head>
<body>
	<h1>${id}</h1>

<script>
	
	const socket = io("'/"+${id}+"'");
	
	socket.on("connect",function(data){
		socket.emit("join","Hey from client");
				
	})	
</script>			
</body>
</html>


`
}
module.exports = templatisize;