import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentUser.name
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }
  changeUsername = (event) => {
    this.setState({name: event.target.value});
  }
  handleKeyPress = (event) => {
    const user = this.state.name;
    const content = this.refs.content.value;
    if (event.key === 'Enter') {
      this.props.addNewMessage(user, content);
      this.refs.content.value = '';
    }
  }

  handleUsername = (event) => {
    if (event.key === 'Enter') {
      this.props.changeUsername(this.state.name);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input value={this.state.name} onChange={this.changeUsername} className="chatbar-username" placeholder={this.props.currentUser.name} onKeyPress={this.handleUsername} />
        <input ref="content" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;