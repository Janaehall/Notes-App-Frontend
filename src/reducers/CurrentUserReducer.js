export default function currentUserReducer(state = null, action) {
  switch(action.type) {
    case "SET_USER":
      let user = action.user
      return {
        id: user.id,
        name: user.name
      }
    case "SIGN_OUT":
      return ''
    default:
      return state
  }
}