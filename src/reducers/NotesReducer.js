export default function notesReducer(state = [], action) {
  console.log(action.type)
  switch(action.type) {
    case "SET_NOTES":
      return action.notes
    case "DELETE_NOTE":
      console.log(action.note)
      return state.filter(note => note !== action.note)
    case "EDIT_NOTE": 
      return state.map(note => {
       return note.id === action.note.id ? action.note : note
      })
    case "ADD_NOTE":
      return [...state, action.note]
    default:
      return state
  }
}