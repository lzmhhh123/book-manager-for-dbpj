import React, { Component } from 'react'
import Link from 'react-router'
import axios from 'axios'
import { browserHistory } from 'react-router'
import config from '../../config/index.json'

import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Home from 'material-ui/svg-icons/action/home'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconPerson from 'material-ui/svg-icons/social/person'
import IconExit from 'material-ui/svg-icons/action/exit-to-app'
import IconBuild from 'material-ui/svg-icons/action/build'
import IconBook from 'material-ui/svg-icons/action/book'
import IconWallet from 'material-ui/svg-icons/action/account-balance-wallet'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const styles = {
  containerStyle: {
    margin: '20px auto',
    width: 900
  }
}

class RightNav extends Component {

  onSelectDropdownMenu(ev, item) {
    switch (item.props.value) {
      case 'logout':
        axios
          .post(config.host + '/logout')
          .then(() => {
            window.location.pathname = '/app'
          })
        break
      case 'profile':
        browserHistory.push('/app/profile')
        break
      case 'manage-user':
        browserHistory.push('/app/z-admin')
        break
      case 'bill':
        browserHistory.push('/app/bill')
        break
      case 'unpaid-books':
        browserHistory.push('/app/unpaid-books')
        break
      case 'book-list':
        browserHistory.push('/app')
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
        <MenuItem primaryText='manage user' leftIcon={<IconBuild />} value='manage-user' disabled={window.z.status === 0}/>
        <MenuItem primaryText='unpaid books' leftIcon={<IconBook />} value='unpaid-books' />
        <MenuItem primaryText='books list' leftIcon={<IconBook />} value='book-list' />
        <MenuItem primaryText='bill' leftIcon={<IconWallet />} value='bill' />
        <MenuItem primaryText='profile' leftIcon={<IconPerson />} value='profile'/>
        <MenuItem primaryText='logout' leftIcon={<IconExit />} value='logout'/>
      </IconMenu>
    )
  }
}

export default class extends Component {

  GoHome() {
    window.location.pathname='/app'
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
