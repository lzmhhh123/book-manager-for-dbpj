import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Form, FormIconField, FormInput, Button, Card, Alert, Glyph } from 'elemental'

export default class extends Component {
  constructor() {
    super()
    this.login = this.login.bind(this)

    this.state = {
      errorMessage: null
    }
  }

  login(event) {
    const username = ReactDOM.findDOMNode(this.refs.name).value
    const password = ReactDOM.findDOMNode(this.refs.password).value
    axios
      .post('/login',{username, password})
      .then(res => {
        if (res.data.error) {
          this.setState({
            errorMessage: res.data.message
          })
        } else {
          // login successful
          this.setState({
            errorMessage: null
          })
          window.location.reload()
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.message
        })
      })
    return false
  }

  render() {
    return (
      <Card>
        <Form onSubmit={this.login}>
          {
            this.state.errorMessage
              ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
              : null
          }
          <FormField label="username" htmlFor="form-input-username">
            <FormInput autoFocus type="username" placeholder="Enter username" name="name" ref="name" />
          </FormField>
          <FormField label="password" htmlFor="form-input-password">
            <FormInput type="password" placeholder="password" name="password" ref="password" />
          </FomrField>
        </Form>
      </Card>
    )
  }
}
