import React, { Component } from 'react'
import { Link } from 'react-router'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Person from 'material-ui/svg-icons/social/person'
import Divider from 'material-ui/Divider'
import Edit from 'material-ui/svg-icons/image/edit'
import Date_range from 'material-ui/svg-icons/action/date-range'
import Format_list_numbered from 'material-ui/svg-icons/editor/format-list-numbered'
import People from 'material-ui/svg-icons/social/people'

export default class extends Component {

  render() {
    let username = window.z.username
    let name = window.z.name
    let worknumber = window.z.worknumber
    let gender = window.z.gender
    let birthday = window.z.birthday

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
              secondaryText={"Name"}
              disabled={true} />
            <ListItem
              leftIcon={<Person />}
              primaryText={`${name}`}
              disabled={true} />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              secondaryText={"Gender"}
              disabled={true} />
	          <ListItem
              leftIcon={<People />}
              primaryText={`${gender}`}
              disabled={true} />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              secondaryText={"Work number"}
              disabled={true} />
	          <ListItem
              leftIcon={<Format_list_numbered />}
              primaryText={`${worknumber}`}
              disabled={true} />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              secondaryText={"Birthday"}
              disabled={true} />
	          <ListItem
              leftIcon={<Date_range />}
              primaryText={`${birthday}`}
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
