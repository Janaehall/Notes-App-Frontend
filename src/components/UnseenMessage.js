import React from 'react'
import {Card} from 'react-bootstrap'

const UnseenMessage = (props) => {
    return(
       <Card id="noteCard" onClick={() => props.handleClick(props.message)} bg="success" text="white" style={{ width: '18rem' }}>
       <Card.Body id="cardBody">
         <Card.Text>
           <p>New note from {props.message.sender.name}!</p>
         </Card.Text>
       </Card.Body>
     </Card>

    )
}

export default UnseenMessage