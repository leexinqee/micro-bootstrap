import React, { Component } from 'react'
import { Button } from 'antd'
import './index.scss'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log("子应用 enter home page")
  }

  goPage = () => {
    this.props.history.push("/subIndex")
  }

  render() {
    return (
      <div className="app-container">
        <h1>index 页面</h1>
        <Button onClick={this.goPage}>去子页面</Button>
      </div>
    )
  }
}

export default Home
