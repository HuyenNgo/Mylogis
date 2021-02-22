import React, { useState } from 'react';
import { Constants } from './../../common'
import * as $ from 'jquery'

const Topbar = (props) => {

  const [isOpenNav, setOpenNav] = useState(true);

  const openNav = () => {
    $('#mySidenav').toggleClass('no-sidebar');
  }

  const closeNav = () => {
    $('#mySidenav').toggleClass('no-sidebar');
  }

  const toggleNav = () => {
    if (isOpenNav) {
      closeNav()
    } else {
      openNav()
    }
    setOpenNav(!isOpenNav)
  }

  const title = props.title ? props.title : "Search"
  const separateLineClass = () => {
    const { separateLine } = props
    if (!separateLine) return 'weight'
    return separateLine
  }

  const renderMidComponent = () => {
    const { isOnlyTitle } = props
    if (isOnlyTitle) {
      return (
        <div className="topbar-midtitle appTheme ">
          <h5>{title}</h5>
        </div>
      )
    } else {
      return (
        <div className="search-input">
          <div className=" has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder={title} />
          </div>
        </div>
      )
    }
  }

  return (
    <div className={`topbar-container botline-${separateLineClass()}`} id="topbar">
      <button type="button" className="btn-sidenav" onClick={toggleNav.bind(this)}><span className="material-icons">menu</span></button>
      {renderMidComponent()}
    </div>
  )
}

export default Topbar
