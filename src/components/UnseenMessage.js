import React, {Component} from 'react'
import {Card} from 'react-bootstrap'

export default class UnseedMessage extends Component {

  render() {
    return(
       <Card id="noteCard" onClick={() => this.props.handleClick(this.props.message)} bg="success" text="white" style={{ width: '18rem' }}>
       <Card.Body id="cardBody">
         <Card.Text>
           <p>New note from {this.props.message.sender.name}!</p>
         </Card.Text>
       </Card.Body>
     </Card>

    )
  }
}