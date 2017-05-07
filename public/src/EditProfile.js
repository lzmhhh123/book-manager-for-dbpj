import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'
import axios from 'axios'
import config from '../../config/index.json'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

import {
  Form,
  FormField,
  FormInput,
  Button,
  Alert
} from 'elemental'

const styles = {
  paperStyle: {
    padding: 20
  },
  splitStyle: {
    height: 15
  }
}

export default class extends Component {
  constructor() {
    super()
    this.editProfile = this.editProfile.bind(this)

    this.state = {
      errorMessage : null
    }
  }

  editProfile(event) {

    event.preventDefault()
    const username = ReactDOM.findDOMNode(this.refs.name).value
    const password = ReactDOM.findDOMNode(this.refs.password).value
    const repeatpassword = ReactDOM.findDOMNode(this.refs.repeatpassword).value
    const oldPassword = ReactDOM.findDOMNode(this.refs.oldpassword).value

    axios
      .post('/editprofile', { username, password, repeatpassword, oldPassword} )
      .then(res => {
        if(res.data.error) {
          this.setState ({
            errorMessage : res.data.message
          })
        }
        setTimeout(() => {
          window.location.pathname = "/app"
        }, 100)
      })
      .catch(err => {
        this.setState ({
          errorMessage : err.response.data.message
        })
      })
  }

  render() {
    return (
      <div className="fixed-card">
        <Paper zDepth={2} style={styles.paperStyle}>
          <h2>{"Edit Your Profile Message"}</h2>
          <div style={styles.splitStyle}></div>
          <Divider />
          <div style={styles.splitStyle}></div>
          <Form onSubmit={this.editProfile}>
          {
            this.state.errorMessage
              ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
              : null
          }
            <FormField label={"Username"} htmlFor="form-input-username">
              <FormInput autoFocus type="username" placeholder="Your new username, not neccessary." name="name" ref="name"/>
            </FormField>
            <FormField label={"Password"} htmlFor="form-input-password">
              <FormInput autoFocus type="password" placeholder="Your new password, not neccessary." name="password" ref="password"/>
            </FormField>
            <FormField label={"Verify password"} htmlFor="form-input-password">
              <FormInput autoFocus type="password" placeholder="Repeat your new password, not neccessary." name="password" ref="repeatpassword"/>
            </FormField>
            <FormField label={"Old password"} htmlFor="form-input-old-password">
              <FormInput autoFocus type="password" placeholder="Your old password, neccessary." name="oldpassword" ref="oldpassword" required/>
            </FormField>
            <div style={styles.splitStyle}></div>
            <Divider />
            <div style={styles.splitStyle}></div>
            <Button type="primary" submit>OK</Button>
            <Link to="/app/profile"><Button type="link-cancel">Cancel</Button></Link>
          </Form>
        </Paper>
      </div>
    )
  }
}
