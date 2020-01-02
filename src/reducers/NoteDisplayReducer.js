export default function noteDisplayReducer(state = null, action) {
  switch(action.type) {
    case "TOGGLE_NOTE_DISPLAY":
      return action.note
    default:
      return state
  }
}