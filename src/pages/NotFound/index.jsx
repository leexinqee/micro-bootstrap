import React, { Component } from 'react'

class NotFound extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log("子应用 enter NotFound page")
  }
  
  render() {
    return (
      <h2>这里是子应用未匹配上路由的情况</h2>
    )
  }
}

export default NotFound
