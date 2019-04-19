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
  render() {
    return (
      <div className="App">

        <RoomList firebase={firebase}/>
        <MessageList firebase={firebase}/>

      </div>

    );
  }
}

export default App;
