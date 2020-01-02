import React, {Component} from 'react'
import {Card} from 'react-bootstrap'

export default class Note extends Component {

  render() {
    let {note} = this.props
    return(
       <Card id="noteCard" onClick={() => this.props.handleClick(note)} bg="info" text="white" style={{ width: '18rem' }}>
      <Card.Header id="cardHeader">
        {note.title.toUpperCase().slice(0,20)}{note.title.length > 20? '...' : null}
      </Card.Header>
       <Card.Body id="cardBody">
         <Card.Text>
           {note.content.slice(0,120)}{note.content.length > 120? '...' : null}
         </Card.Text>
       </Card.Body>
     </Card>

    )
  }
}