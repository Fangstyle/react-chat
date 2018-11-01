import axios from 'axios'

const USER_LIST = 'USER_LIST'
// state
const initState = {
  userList: []
}

function setUserList (data) {
  return {type: USER_LIST, payLoad: data}
}

// reducer
export function userList (state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      console.log(action.payLoad)
      return {...state, userList: action.payLoad}
    default:
      return state
  }
}

// dispatch function

export function getUserList (type) {
  console.log(type)
  return (dispatch) => {
    axios.get('/user/list', {params: {type}}).then((res) => {
      if (res.data.code === 0) {
        dispatch(setUserList(res.data.data))
      }
    })
  }
}