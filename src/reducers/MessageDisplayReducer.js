export default function messageDisplayReducer(state = null, action) {
  switch(action.type) {
    case "TOGGLE_MESSAGE_DISPLAY":
      return action.message
    default:
      return state
  }
}