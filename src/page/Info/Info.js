import React from 'react'

class Info extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
       11 {this.props.type}
      </div>)
  }
}

export default Info