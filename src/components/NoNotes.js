
import {Card} from 'react-bootstrap'
import React from 'react'
import {NavLink} from 'react-router-dom'


const NoNotes = (props) => {
  return(
    <Card id="noNotesCard">
      <Card.Img variant="top" src="https://www.simplystamps.com/media/catalog/product/cache/5/image/600x600/9df78eab33525d08d6e5fb8d27136e95/s/c/school_128C.png" />
      {props.type === 'notes' ?
        <Card.Body>
          <Card.Text>
            It looks like you don't have any notes!
          </Card.Text>
          <NavLink id="navLink" to='/new'>Add Note</NavLink> 
        </Card.Body>
        :
        <Card.Body>
          <Card.Text>
            It looks like your friends don't love you!
          </Card.Text>
        </Card.Body>}
    </Card>
  )
}

export default NoNotes