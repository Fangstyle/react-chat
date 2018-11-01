import React from 'react'
import io from 'socket.io-client'
import {InputItem, List} from 'antd-mobile'

const socket = io('ws://localhost:9093')

class Chat extends React.Component {
  componentDidMount () {
    socket.on('recieveMsg', (data) => {
      console.log(m)
      this.setState({
        msgList: [...this.state.msgList, data.text]
      })
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      msgList: [],
      text: ''
    }
  }

  handleMsg (v) {
    this.setState({
      text: v
    })
  }

  submitMsg () {
    console.log('hehehehe')
    socket.emit('sendMsg', {text: this.state.text})
    this.setState({
      text: ''
    })
  }

  render () {
    return (
      <div className='stick-footer'>
        <List>
          <InputItem placeholder='请输入...' onChange={(v) => {
            this.handleMsg(v)
          }}
                     value={this.state.text}
                     extra={<span onClick={() => {
                       this.submitMsg()
                     }}>发送</span>}
          ></InputItem>
        </List>
      </div>
    )
  }
}

export default Chat