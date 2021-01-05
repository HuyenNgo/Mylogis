import React from 'react'
import { Link, NavLink } from "react-router-dom";
import $ from 'jquery'

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props)
  }


  componentDidMount = () => {
    $("#menuList").on("click", "a", function (e) {
      let parent = $(this).parent();
      console.log(parent)
      parent.addClass("selected").siblings().removeClass("selected");
    })
  }

  logout = () => {
    localStorage.removeItem("User")
    this.props.children.props.history.push("/")
  }



  render() {
    return (
      <div className="sidebar-container sidenav open" id="mySidenav">
        <Link to="/home" className="logo-section" alt="no-logo"></Link>
        <div className="sidebar-content">
          <div className="profile-section">
            <div className="row">
              <img alt="./assets/images/no-avatar.png" src="./assets/images/no-avatar.png" className="circle-avatar col-md-4" />
              <span className="col-md-8" id="sideProfileName">Huyền Ngô</span>
            </div>
          </div>
          <div className="menu-section">
            <div>
              <ul id="menuList">
                <li>
                  <NavLink to="/bill" >
                    <span className="material-icons">local_shipping</span>
                    <span>Quản lý đơn hàng</span></NavLink>
                </li>
                <li>
                  <NavLink to="/bill-entry" >
                    <span className="material-icons">receipt</span>
                    <span>Lập đơn hàng</span></NavLink>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="sidebar-footer">
          <Link to="" onClick={this.logout} alt="no-logo" className="m-auto"><span >Đăng xuất</span></Link>
        </div>
      </div >
    )
  }
}



// https://material.io/resources/icons/?icon=local_shipping&style=baseline