//adding "validateMessage,async" to line 23
const express = require('express');
const path = require("path");
const hbs = require("hbs");
const socket = require('socket.io');

const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port,function(){
	console.log(`listening on port ${port}`);
})

app.use(express.static('public'));


// Express config
const publicDirectory = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

const nameofApp = "chatty app";


app.get("",(req,res)=>{
        res.render("index",{
                title: nameofApp
        })
})
 
	
module.exports = {server,port,socket};