import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Form, FormInput, FormField, Card, Alert, Button } from 'elemental'
import '../styles.min.css'
import config from '../../config/index.json'

const styles = {
  containerStyle: {
    width: '400px',
    margin: '200px auto'
  }
}

export default class extends Component {
  constructor() {
    super()
    this.login = this.login.bind(this)

    this.state = {
      errorMessage: null
    }
  }

  login(event) {
    const username = ReactDOM.findDOMNode(this.refs.username).value
    const password = ReactDOM.findDOMNode(this.refs.password).value
    axios
      .post('/login', {username, password})
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
      <div style={styles.containerStyle}>
        <Card>
          <Form onSubmit={this.login}>
            {
              this.state.errorMessage
                ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
                : null
            }
            <FormField label="username" htmlFor="form-input-username">
              <FormInput autoFocus type="username" placeholder="Enter username" name="username" ref="username" />
            </FormField>
            <FormField label="password" htmlFor="form-input-password">
              <FormInput type="password" placeholder="password" name="password" ref="password" />
            </FormField>
            <Button submit>login</Button>
          </Form>
        </Card>
      </div>
    )
  }
}
