import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Switch, Route} from 'react-router-dom'
import UserCard from '../../component/usercard/usercard'
import {getUserList} from "../../redux/userList.redux";

@connect(state => (state.userList), {getUserList})
class Boss extends React.Component {
  componentDidMount( ) {
    this.props.getUserList('genius')
  }
  render () {

    return (
      <div>
        <UserCard userList={this.props.userList}></UserCard>
      </div>

    )
  }
}

export default Boss