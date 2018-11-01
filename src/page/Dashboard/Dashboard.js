import React from 'react'
import NavLink from '../../component/navLink/navLink'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect, Switch, Route} from 'react-router-dom'
import GeniusInfo from "../GeniusInfo/GeniusInfo";
import Boss from '../Boss/Boss'
import Genius from '../Genius/Genius'
import My from '../My/My'

function Msg () {
  return <h2>Msg</h2>
}

@connect(state => state, null)
class Dashboard extends React.Component {
  componentDidMount () {

  }

  render () {
    const {pathname} = this.props.location
    const user = this.props.author
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type == 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type == 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: My
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header'
                mode='dard'>{navList.find(v => v.path == pathname) ? navList.find(v => v.path == pathname).title : ''}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {
              navList.map((item) => {
                if (item.path === pathname) {
                  return (<Route key={item.path} path={item.path} component={item.component}></Route>)
                }
              })
            }
          </Switch>
        </div>
        <NavLink navList={navList}></NavLink>
      </div>

    )
  }
}

export default Dashboard