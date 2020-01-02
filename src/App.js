import React, {Component} from 'react';
import './App.css';
import LogIn from './components/LogIn'
import Header from './components/Header'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Notes from './components/Notes'
import Messages from './components/Messages'
import SignUp from './components/SignUp'

import NewNoteForm from './components/NewNoteForm'


class App extends Component{
  render(){
    return (
      <div>
      <Header />
      <Switch>
        <Route exact path='/login' component={LogIn}/>
        <Route exact path='/sign_up' component={SignUp}/>
        <Route path='/notes' render={(props) => <Notes {...props} type={'notes'}/>}/>
        <Route exact path={`/new`} component={NewNoteForm}/>
        <Route path={`/messages`} render={(props) => <Messages {...props} type={'messages'}/>}/>

      </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    note: state.note,
    notes: state.notes,
    messages: state.messages
  };
};
 
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: (users) => dispatch({ type: 'FETCH_USERS', users: users })
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
