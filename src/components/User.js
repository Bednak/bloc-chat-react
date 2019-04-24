import React, { Component } from 'react';

class User extends Component {
   constructor(props) {
     super(props);

     this.signIn = this.signIn.bind(this);
     this.signOut = this.signOut.bind(this);

   }

   componentDidMount() {

     this.props.firebase.auth().onAuthStateChanged( user => {
     this.props.setUser(user);

    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();

    if(this.props.currentUser !== "Guest")
      alert("You have succesfully signed out!");

  }


   render() {

     return(

       <aside className="userButton">
        <h4>Welcome, {this.props.currentUser}!</h4>
        <button type="button" onClick={this.signIn} >Sign in</button>
        <button type="button" onClick={this.signOut} >Sign out</button>
       </aside>

     );
  }
}

export default User;
