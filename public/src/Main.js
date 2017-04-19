import React, { Component } from 'react'
import axios from 'axios'
import {
  Router,
  Route,
  Redirect,
  IndexRedirect,
  IndexRoute,
  Link,
  browserHistory,
  hashHistory,
} from 'react-router'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class extends Component {
  render() {
    if(!window.z) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Router history={browserHistory}>
            <Router path="/" component={Login} />
          </Router>
        </MuiThemeProvider>
      )
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Router history={browserHistory}>
          <Route path="/" component={Topnav}>
            <Route path="/homepage" component={Homepage} />
            <Route path="/profile" component={Profile} />
            <Route path="/profile/edit" component={Editprofile} />
          </Route>
        </Router>
      </MuiThemeProvider>
    )
  }
}
