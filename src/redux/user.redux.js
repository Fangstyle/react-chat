import axios from 'axios'
import {getRedirectPath} from '../util/util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}

export function author (state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS :
      console.log(action)
      return {...state, msg: '', redirectTo: getRedirectPath(action.payLoad), isAuth: true, ...action.payLoad}
    case LOGIN_SUCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payLoad), isAuth: true, ...action.payLoad}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.payLoad}
    default:
      return state
  }
}
// actions
function registerSuccess (data) {
  return {type: REGISTER_SUCCESS, payLoad: data}
}

function loginSuccess (data) {
  return {type: LOGIN_SUCESS, payLoad: data}
}

function loadData (data) {
  return {type: LOAD_DATA, payLoad: data}
}


function errorMsg (msg) {
  console.log('msg', msg)
  return {msg, type: ERROR_MSG, payLoad: msg}
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户密码必须输入')
  }
  return (dispatch => {
   // dispatch(requestBegin()) 开始
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if (res.status == 200 && res.data.code === 0) {
          // dispatch(registerSuccess({user,pwd,type})) success
          dispatch(loginSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  })
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.status == 200 && res.data.code === 0) {
          dispatch(registerSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }

}