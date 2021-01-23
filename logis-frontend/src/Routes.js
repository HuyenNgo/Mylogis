import React, { Component, useEffect, useState } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from './components'
import { AdminLayout } from './layouts'

import {
  AdHome as AdHomeView,
  Login as LoginView,
  Bill as BillView,
  BillEntry as BillEntryView,
  BillSupplier as BillSupplierView,
  BillDelivery as BillDeliveryView,
  BillSubmitResult as BillSubmitResultView
} from './views'

const Routes = props => {
  const [state, setState] = useState({

  })


  const curUser = JSON.parse(localStorage.getItem("User"))

  // if (curUser && curUser.userName) {
  return (
    <Switch>

      <RouteWithLayout
        component={AdHomeView}
        exact
        layout={AdminLayout}
        path='/home'
        {...state}
      />

      <RouteWithLayout
        component={BillView}
        exact
        layout={AdminLayout}
        path='/bill'
        {...state}
      />

      <RouteWithLayout
        component={BillEntryView}
        exact
        layout={AdminLayout}
        path='/bill-entry'
        {...state}
      />

      <RouteWithLayout
        component={BillSupplierView}
        exact
        layout={AdminLayout}
        path='/bill-supplier'
        {...state}
      />

      <RouteWithLayout
        component={BillDeliveryView}
        exact
        layout={AdminLayout}
        path='/bill-delivery'
        {...state}
      />

      <RouteWithLayout
        component={BillSubmitResultView}
        exact
        layout={AdminLayout}
        path='/bill-submit-result'
        {...state}
      />

      <Route
        path="/login"
        exact
        component={LoginView}
      />

      <Redirect exact from='/' to='/login' />
      <Redirect to='/login' />
    </Switch>
  )
  // } else {
  //   return (
  //     <Switch>
  //       <Route
  //         path="/login"
  //         exact
  //         component={LoginView}
  //       />
  //       <Redirect exact from='/' to='/login' />
  //       <Redirect to='/login' />
  //     </Switch>
  //   )
  // }


}

export default Routes