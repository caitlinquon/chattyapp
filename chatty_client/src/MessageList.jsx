import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const allMessages = this.props.messages.map((message) =>  {
      if (message.type === "incomingMessage") {
        return <Message key={message.id} username={message.user} content={message.content} />
      } if(message.type === "incomingNotification") {
        return <Notification key={message.id} username={message.username} content={message.content} />
      }  
    });
    return (<div className="messages">
      {this.props.messages.map((message) =>  {
      if (message.type === "message") {
        return <Message key={message.id} username={message.user} content={message.content} />
      } if(message.type === "notification") {
        return <Notification key={message.id} username={message.username} content={message.content} />
      }
    })}
      </div>);
  }
  
}

export default MessageList;