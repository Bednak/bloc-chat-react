import React, { Component } from 'react';

class MessageList extends Component {
   constructor(props) {
     super(props);
     this.state = {

       messages: [],
       username: "",
       content: "",
       sentAt: "",
       roomId: ""

     };

     this.messagesRef = this.props.firebase.database().ref('messages');
   }


   componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message) })

    });
  }


  displayMessages(message, index) {

    if(message.roomId === this.props.currentRoom.key)
    {
			return (
				<section className='message' key={message.key}>
					<p>User: {message.username}</p>
					<p>Sent At: {message.sentAt}</p>
					<p>Message: {message.content}</p>
				</section>
       )
     }
   }

   render() {
     return(

      <div className="MessageList">
        <h1 className="currentRoom"> Current Room: {this.props.currentRoom.name} </h1>
        {this.state.messages.map((message, index) => this.displayMessages(message, index))}
      </div>
     );
  }
}

export default MessageList;
