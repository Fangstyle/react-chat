import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class navLink extends React.Component {

  static propTypes = {
    navList: PropTypes.array
  }

  constructor (props) {
    super(props)
  }

  render () {
    const pathname = this.props.location
    console.log(this.props)
    const navList = this.props.navList.filter(v => !v.hide)
    return (
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          prerenderingSiblingsNumber={0}
        >
          {
            navList.map((item) => {
              return (<TabBar.Item
                title={item.title}
                key={item.path}
                icon={{uri: require(`./img/${item.icon}.png`)}}
                selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
                selected={pathname === item.path}
                badge={1}
                onPress={() => {
                  this.props.history.push(item.path)
                }}
              >
              </TabBar.Item>)
            })
          }
        </TabBar>
      </div>
    )
  }
}

export default navLink