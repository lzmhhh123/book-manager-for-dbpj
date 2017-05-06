import React, { Component } from 'react'
import { Link } from 'react-router'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Person from 'material-ui/svg-icons/social/person'
import Divider from 'material-ui/Divider'
import Edit from 'material-ui/svg-icons/image/edit';
import Mail from 'material-ui/svg-icons/content/mail'
import People from 'material-ui/svg-icons/social/people'

export default class extends Component {

  render() {
    let username = "window.z.username"
    let email = "window.z.email"
    let identity = "window.z.identity"

    return (
      <div className="fixed-card">
        <Paper zDepth={1}>
          <List>
            <ListItem
              disabled={true}
              secondaryText={"Username"} />
            <ListItem
              disabled={true}
              leftIcon={<Person />}
              primaryText={`${username}`} />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              secondaryText={"Mail"}
              disabled={true} />
            <ListItem
              leftIcon={<Mail />}
              primaryText={`${email}`}
              disabled={true} />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              secondaryText={"Identity"}
              disabled={true} />
	          <ListItem
              leftIcon={<People />}
              primaryText={`${identity}`}
              disabled={true} />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              disabled={true}
              rightIconButton={
                <Link to="app/profile/edit">
                  <IconButton tooltip="Edit your profile." touch={true}><Edit/></IconButton>
                </Link>}
            />
            <ListItem disabled={true}/>
          </List>
        </Paper>
      </div>
    )
  }
}
