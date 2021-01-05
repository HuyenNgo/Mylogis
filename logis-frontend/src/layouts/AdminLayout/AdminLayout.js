import React from 'react'
import PropTypes from 'prop-types'
import { Sidebar } from './components'
import $ from 'jquery'

export default class AdminLayout extends React.Component {
  constructor(props) {
    super(props)
    console.log(this)
  }

  componentDidMount() {
    if (!localStorage.getItem("User")) {
      this.props.children.props.history.push("/login")
    }

    $("#adminContainer").css({ 'min-height': `${window.screen.height - 143}px` })
  }

  render() {
    const { children } = this.props

    return (
      <div className="admin-layout" id="adminLayout">
        <Sidebar {...this.props} />
        <div className="admin-container " id="adminContainer">
          {children}
          <div className="footer">
          </div>
        </div>
      </div>
    )
  }
}
// }

AdminLayout.propTypes = {
  children: PropTypes.node
}

