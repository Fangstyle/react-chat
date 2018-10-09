import React from 'react'
import {Button, WingBlank, WhiteSpace, InputItem} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(state => (state.author), {login})
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      password: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  bindFormChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  componentDidMount() {
    console.log('11122222')
  }

  register () {
    this.props.history.push('/register')
  }

  handleLogin() {
    console.log(this.state)
    this.props.login({user: this.state.user, pwd: this.state.pwd})
  }
  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : ''}
        <Logo></Logo>
        <div className="error">{this.props.msg}</div>
        <WingBlank>
          <InputItem onChange={(v) => {
            this.bindFormChange('user', v)
          }}>用户名</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={(v) => {
            this.bindFormChange('pwd', v)
          }}>密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login