import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';
import Notification from './Notification.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      messages: [
   
      ], 
      userCount: 0
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws = new WebSocket("ws://localhost:3001");
    this.ws.onopen = (event) => {
      console.log('Established connection!', event);
    }
    
    this.ws.onmessage = (event) => {
      console.log(event.data);
      const incomingMessage = JSON.parse(JSON.parse(event.data));
      switch (incomingMessage.type) {
        case "incomingMessage":
          const msgObj = {
            type: "message",
            id: incomingMessage.id,
            user: incomingMessage.username,
            content: incomingMessage.content
          }
          const messages = this.state.messages.concat(msgObj);  
          this.setState({messages: messages})
          break;
        case "incomingNotification":
          const notificationObj = {
              type: "notification",
              id: incomingMessage.id,
              user: incomingMessage.username,
              content: incomingMessage.content
            }
          const notifications = this.state.messages.concat(notificationObj);  
          this.setState({messages: notifications});
          break;
        case "countNotification":
          const userCount = {
              type: "countNotification",
            }
          this.setState({userCount: incomingMessage.userCount})
          break;
        default:
          throw new Error("Unknown event type" + incomingMessage.type);
      }
     
    }
  }
  
  addNewMessage(user, content) {
    const newMessage = {type: "sendMessage", username: user, content: content};
    console.log(newMessage)
    this.ws.send(JSON.stringify(newMessage));

    if (this.state.currentUser.name !== user) {
      //send name change event
      this.setState({currentUser: {name: user}});
    }
  }

  changeUsername(user) {
    if (this.state.currentUser.name !== user) {
      const newNotification = {
        type: "usernameChange",
        content: `${this.state.currentUser.name} has changed their name to ${user}`
      };
      this.ws.send(JSON.stringify(newNotification));
      this.setState({currentUser: {name: user}});
    }
  }

  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} changeUsername={this.changeUsername}/>
        <MessageList messages={this.state.messages} />
        <Navbar userCount={this.state.userCount} />
      </div>
    );
  }
}
export default App;
