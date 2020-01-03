import React, {Component} from 'react';
import './App.css';
import LogIn from './components/LogIn'
import Header from './components/Header'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Notes from './components/Notes'
import Messages from './components/Messages'
import SignUp from './components/SignUp'

import NewNoteForm from './components/NewNoteForm'


class App extends Component{

  state = {
    filter: null
  }

  handleChange = e => {
    this.setState({
      filter: e.target.value
    })
  }

  render(){
    return (
      <div>
      <Header />
        <Route exact path='/login' component={LogIn}/>
        {this.props.currentUser?
           <Switch>
            <Route exact path='/sign_up' component={SignUp}/>
            <Route path='/notes' render={(props) => <Notes {...props} 
              handleChange={this.handleChange} filter={this.state.filter}/>}/>
            <Route exact path={`/new`} component={NewNoteForm}/>
            <Route path={`/notes_from_friends`} render={(props) => <Messages {...props} 
              handleChange={this.handleChange} filter={this.state.filter}/>}/>
           </Switch>
            :
          <Redirect to='/login'/>
        }
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
