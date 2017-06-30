const express = require('express');
const SocketServer = require('ws').Server;
const UUID = require('uuid');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let userCount = 0;
wss.on('connection', (ws) => {
  function broadcast(msgObj) {
      wss.clients.forEach((client) => {
         client.send(JSON.stringify(msgObj));
      })
   }
  userCount++;
  broadcast({type: 'countNotification', userCount: userCount });

  console.log('Client connected')

  ws.on('message', (data) => {
    console.log("hello");
    const parsedMessage = JSON.parse(data);
    switch (parsedMessage.type){
      case "sendMessage":
        const newMessage = {
          id: UUID(),
          type: "incomingMessage",
          username: parsedMessage.username, 
          content: parsedMessage.content
        }
        console.log("User " + newMessage.username + " said " + newMessage.content);
        broadcast(newMessage);
        break;
      case "usernameChange":
        const newNotification = {
          id: UUID(),
          type: "incomingNotification",
          content: parsedMessage.content
        }
        broadcast(newNotification);
        break;
      }
    });
    ws.on('close', () => {
      console.log('Client disconnected');
      userCount--;
      broadcast(({type: 'countNotification', userCount }));
  });
});


