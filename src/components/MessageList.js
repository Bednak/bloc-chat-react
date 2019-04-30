import React, { Component } from 'react';

class MessageList extends Component {
   constructor(props) {
     super(props);
     this.state = {
       messages: [],
       username: '',
       message: '',
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

   sendMessage(e) {

     e.preventDefault();

     if(this.props.currentUser !== "Guest"){

       this.messagesRef.push({
         username: this.props.currentUser,
         content: this.state.message,
         roomId: this.props.currentRoom.key,
         sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
       });

       this.setState({message: ' ' });
     }

     else{
       alert("Please sign in to send messages");
       this.setState({message: ' ' });
     }
   }

   handleChange(e) {
       this.setState({message: e.target.value })
     }


   render() {
     return(

      <div className="MessageList">
        <h1 className="currentRoom"> Current Room: {this.props.currentRoom.name} </h1>
        
        <ul id="list">
          <li>{this.state.messages.map((message, index) => this.displayMessages(message, index))}</li>
        </ul>

        <form className='message'>
          <textarea rows="4" id="textarea" cols="195" placeholder="Write your message here" value={this.state.message} onChange={(e) => this.handleChange(e)}/>
          <input type="submit" id="submit" value="Send Message" onClick= {(e) => this.sendMessage(e)} />
        </form>

      </div>
     );
  }
}

export default MessageList;
