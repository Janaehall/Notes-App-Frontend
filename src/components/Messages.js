import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import UnseenMessage from './UnseenMessage'
import MessageDisplay from './MessageDisplay'
import {Switch, Route, Redirect} from 'react-router-dom'
import NoNotes from './NoNotes'
import FilterForm from './FilterForm'


class Messages extends Component{

  handleClick = (message) => {
    this.props.toggleMessageDisplay(message)
    this.props.history.push(`/notes_from_friends/${message.id}`)
  }


  filterMessages = () => {
    if (this.props.filter){
      return this.props.messages.filter(message => {
        return message.note.tags.some(tag => tag.name.toLowerCase().includes(this.props.filter.toLowerCase()))
      })
    } else {
      return this.props.messages
    }
  }

  renderMessages = () => {
    return (
    <div id="notesList">
      {this.filterMessages().map(message => {
        return message.seen? 
        <Message message={message} key={message.id} handleClick={this.handleClick}/> 
        :
        <UnseenMessage message={message} key={message.id} handleClick={this.handleClick}/>
    })}
    </div>)
  }



  setRoutes = () => {
    let {match} = this.props
    return (
      <div>
        {this.renderMessages()}
        {this.props.message?
          <Switch>
            <Route exact path={`${match.path}/:id`} component={MessageDisplay}/>
          </Switch>
          :
          <Redirect to='/notes_from_friends'/>
        }
      </div>
    )
  }



  render() {
    console.log(this.props.messages.length)
    return (
    <div>
      {this.props.messages.length > 0 ?
        <div>
          <FilterForm handleChange={this.props.handleChange}/>
          {this.setRoutes()}
        </div>
        :
        <NoNotes type={'messages'} />
      }
    </div>
  )
}
}



const mapStateToProps = state => {
  return {
    message: state.message,
    messages: state.messages
  };
};



const mapDispatchToProps = dispatch => {
  return {
    toggleMessageDisplay: message => dispatch({type: "TOGGLE_MESSAGE_DISPLAY", message: message}),
    seenMessage: message => dispatch({type: "SEEN_MESSAGE", message: message})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Messages);
