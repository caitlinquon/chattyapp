import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    console.log("hello caitlin how are you",this.props.userCount);
    return (
    <nav className="navbar">
     <a href="/" className="navbar-brand">Chatty</a>
     <h4 className="userCount">Online Users: {this.props.userCount}</h4>
    </nav>
   );
  }
}
export default Navbar;