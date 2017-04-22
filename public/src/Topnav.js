import React, { Component } from 'react'
import Link from 'react-router'
import axios from 'axios'
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Home from 'material-ui/svg-icons/action/home'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconPerson from 'material-ui/svg-icons/social/person'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const styles = {
  containerStyle: {
    margin: '20px auto',
    width: 800
  }
}

class RightNav extends Component {

  onSelectDropdownMenu(ev, item) {
    switch (item.props.value) {
      case 'logout':
        axios
          .post('/logout')
          .then(() => {
            window.location.reload()
          })
        break
      case 'profile':
        browserHistory.push('/profile')
        break
      case 'manage-user':
        browserHistory.push('/z-admin')
        break
    }
  }

  render() {
    return (
      <IconMenu
        onItemTouchTap={this.onSelectDropdownMenu}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='manage user' value='manage-user' disabled={window.z ? false : true}/>
        <MenuItem primaryText='profile' leftIcon={<IconPerson />} value='profile'/>
        <MenuItem primaryText='logout' value='logout'/>
      </IconMenu>
    )
  }
}

export default class extends Component {

  GoHome() {
    window.location.pathname='/'
  }

  render() {
    return (
      <div>
        <div>
          <AppBar
            title='Book-manager'
            iconElementLeft={<IconButton><Home /></IconButton>}
            onLeftIconButtonTouchTap={this.GoHome}
            iconElementRight={<RightNav />}
          />
        </div>
        <div style={styles.containerStyle}>{this.props.children}</div>
      </div>
    )
  }
}
