import React, { Component } from 'react'
import { Button } from 'antd'
class SubIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log("子应用 enter subIndex page")
  }

  goPage = () => {
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h2>subIndex</h2>
        <Button onClick={this.goPage}>去父页面</Button>
      </div>
    )
  }
}

export default SubIndex
