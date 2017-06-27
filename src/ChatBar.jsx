import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      content: ''
    };
    this.userChanged = this.userChanged.bind(this);
    this.messageChanged = this.messageChanged.bind(this);
    this.onEnterPressed = this.onEnterPressed.bind(this);
  }

  userChanged(event) {
    console.log(event.target.value);
    this.setState({
      user: event.target.value
    });
  }
  messageChanged(event) {
    console.log(event.target.value);
    this.setState({
      content: event.target.value
    });
  }

  onEnterPressed(event) {
    console.log('key pressed: ', event.key);
    if (event.key == 'Enter') {
      this.props.newMessage(this.state.user, this.state.content);
      this.setState({
        content: ''
      });
    }
  }

  render() {
    return (
    <div>
      <h1>{this.props.user}</h1>
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user} value={this.state.user} onChange={this.userChanged} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.onEnterPressed} onChange={this.messageChanged} value={this.state.content}/>
      </footer>
    </div>
    );
  }
}
export default ChatBar;