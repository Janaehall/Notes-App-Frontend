import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import notesReducer from './reducers/NotesReducer'
import messagesReducer from './reducers/MessagesReducer'
import currentUserReducer from './reducers/CurrentUserReducer';
import noteDisplayReducer from './reducers/NoteDisplayReducer'
import messageDisplayReducer from './reducers/MessageDisplayReducer'


const reducers = combineReducers({
  notes: notesReducer,
  currentUser: currentUserReducer,
  note: noteDisplayReducer,
  messages: messagesReducer,
  message: messageDisplayReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
