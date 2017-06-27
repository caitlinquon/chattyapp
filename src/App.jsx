import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        id: "0",
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      {
        id: "1",
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
    ]
  };
  this.addMessage = this.addMessage.bind(this);
}

addMessage(username, content) {
  const newMessage = {id: Date.now(), username: username, content: content};
  const messages = this.state.messages.concat(newMessage);
  this.setState({messages: messages});
}

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    this.addMessage('Michelle', 'Hello there!');
  }, 3000);
}
  render() {
    return (
      <div>
        <ChatBar user = {this.state.currentUser.name} newMessage={this.addMessage}/>
        <MessageList messages = {this.state.messages} />
        <Navbar />
      </div>
      );
    }
  
}
export default App;

