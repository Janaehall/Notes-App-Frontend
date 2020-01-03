export default function messagesReducer(state = [], action) {
  switch(action.type){
    case 'SET_MESSAGES':
      return action.messages
    case 'DELETE_MESSAGE':
      return state.filter(message => message.id !== action.message.id)
    case 'SEEN_MESSAGE':
      return state.map(message => {
        return message === action.message? {...message, seen: true} : message
      })
    default:
      return state
  }
}