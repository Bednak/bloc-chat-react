import React, { Component } from 'react';

class RoomList extends Component {
   constructor(props) {
     super(props);
     this.state = { rooms: [],
       newRoom: ''
     };

     this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })

    });
  }

  createRoom(e) {

      e.preventDefault();
      this.roomsRef.push({name: this.state.newRoom});
      this.setState({ newRoom: ' ' });

  }

  handleChange(e) {
      this.setState({ newRoom: e.target.value })
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
          <input type="text" id="room" value={this.state.newRoom} onChange={ (e) => this.handleChange(e) } />
          <input type="submit" value="Add Room" onClick= {(e) => this.createRoom(e)} />
        </form>

       </div>
      </aside>

     )
   }

}

export default RoomList;
