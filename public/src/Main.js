import React, { Component } from 'react'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect
} from 'react-router'
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Topnav from './Topnav'
import Homepage from './Homepage'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Login from './Login'
import UnpaidBooks from './UnpaidBooks'
import Bill from './Bill'
import ManagerUser from './ManagerUser'
import axios from 'axios'

export default class extends Component {

  constructor() {
    super()
    this.state = {
      user: null
    }
  }

  render() {
    if(!window.z) {
      return (
       <MuiThemeProvider>
         <Router history={browserHistory}>
           <Route path="/app" component={Login} />
         </Router>
       </MuiThemeProvider>
      )
    }

    return (
      <MuiThemeProvider >
        <Router history={browserHistory}>
          <Route path="/app" component={Topnav} >
            <IndexRoute component={Homepage} />
            <Route path="/app/profile" component={Profile} />
            <Route path="/app/profile/edit" component={EditProfile} />
            <Route path="/app/bill" component={Bill} />
            <Route path="/app/unpaid-books" component={UnpaidBooks} />
            <Route path="/app/z-admin" component={ManagerUser} />
          </Route>
        </Router>
      </MuiThemeProvider>
    )
  }
}
