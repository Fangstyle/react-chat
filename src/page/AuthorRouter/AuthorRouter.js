import React from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";

@withRouter
class AuthorRouter extends React.Component {
  componentDidMount () {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          // 有登录信息de
          // this.props.loadData(res.data.data)
        } else {
          // console.log(this.props.history)
          this.props.history.push('/login')
        }
      }
    })
  }

  render () {
    return (
      <div>

      </div>
    )
  }

}

export default AuthorRouter