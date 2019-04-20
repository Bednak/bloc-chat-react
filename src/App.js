import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC7-qvNRSxcblChkr6zvHA1IRY4U3HmF-8",
    authDomain: "bloc-chat-643bc.firebaseapp.com",
    databaseURL: "https://bloc-chat-643bc.firebaseio.com",
    projectId: "bloc-chat-643bc",
    storageBucket: "bloc-chat-643bc.appspot.com",
    messagingSenderId: "885244154978"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentRoom: ''};

  }

  setCurrentRoom(room) {

  this.setState({currentRoom: room})

  }

  render() {
    return (
      <div className="App">

        <RoomList firebase={firebase} currentRoom={this.state.currentRoom} setCurrentRoom={this.setCurrentRoom.bind(this)}/>
        <MessageList firebase={firebase} currentRoom={this.state.currentRoom}/>

      </div>

    );
  }
}

export default App;
