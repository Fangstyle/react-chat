import React from 'react'
import {Radio, List, InputItem, WhiteSpace, Button} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'

@connect(state => (state.author), {register})
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pwd: '',
      user: '',
      repeatpwd: '',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  bindFormChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  handleRegister () {
    this.props.register({
      user: this.state.user,
      pwd: this.state.pwd,
      repeatpwd: this.state.repeatpwd,
      type: this.state.type
    })
  }

  componentDidMount () {
    console.log(this.props.msg)
  }

  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : ''}
        <Logo></Logo>
        <div>{this.props.msg}</div>
        <List>
          <InputItem onChange={(v) => {
            this.bindFormChange('user', v)
          }}>账号</InputItem>
          <InputItem onChange={(v) => {
            this.bindFormChange('pwd', v)
          }}>密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={(v) => {
            this.bindFormChange('repeatpwd', v)
          }}>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem onChange={(v) => {
            this.bindFormChange('type', 'genuis')
          }} checked={this.state.type === 'genuis'}>牛人</RadioItem>
          <RadioItem onChange={(v) => {
            this.bindFormChange('type', 'boss')
          }} checked={this.state.type === 'boss'}>BOSS</RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register