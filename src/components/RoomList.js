import React, { Component } from 'react';

class RoomList extends Component {
   constructor(props) {
     super(props);
     this.state = { rooms: []};

     this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })

    });
  }

  createRoom(newRoomName) {

    this.roomsRef.push({name: newRoomName});
  }

   render() {
     return(

      <aside className="RoomList">
       <h1>Bloc Chat</h1>
        <ul>
        {this.state.rooms.map( (room, index) =>
          <li key={room.key} align="left"> {room.name} </li> )
        }
       </ul>

       <div>
        <form>
          <input type="text" id="room" placeholder="New Room Name"></input>
          <button type="button" onClick={() => this.createRoom(document.getElementById('room').value)}>Add Room</button>
        </form>

       </div>
      </aside>

     )
   }

}

export default RoomList;
