export default function FilterReducer(state = null, action) {
  switch(action.type) {
    case "ADD_FILTER":
      return action.filter
    case "REMOVE FILTER":
      return null
    default:
      return state
  }
}