import React, { Component } from 'react'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute
} from 'react-router'
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Topnav from './Topnav'
import Homepage from './Homepage'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Login from './Login'

console.log(window);

export default class extends Component {
  render() {

    // if(!window.z) {
    //   return (
    //     <MuiThemeProvider>
    //       <Router history={browserHistory}>
    //         <Route path="/" component={Login} />
    //       </Router>
    //     </MuiThemeProvider>
    //   )
    // }

    return (
      <MuiThemeProvider >
        <Router history={browserHistory}>
          <Route path="/" component={Topnav} >
            <IndexRoute component={Homepage} />
            <Route path="/profile" component={Profile} />
            <Route path="/profile/edit" component={EditProfile} />
          </Route>
        </Router>
      </MuiThemeProvider>
    )
  }
}
