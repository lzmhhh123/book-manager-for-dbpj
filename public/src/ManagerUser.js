import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Paper, RaisedButton, Divider, FlatButton, RadioButtonGroup, RadioButton} from 'material-ui'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import {Form, FormField, FormInput, Alert, Button} from 'elemental'

const styles = {
  button: {
    margin: 12
  },
  radioButton: {
    marginBottom: 16
  }
}

export default class extends Component {
  constructor() {
    super()
    this.adduser = this.adduser.bind(this)
    this.state = {
      height: '600px',
      open: false,
      errorMessage: null,
      gender: null,
      status: null,
      tableData: []
    }
  }

  HandleOpen = () => {
    this.setState({
      open: true
    })
  }

  changeGender = (event, value) => {
    event.preventDefault()
    this.setState({
      gender: value
    })
  }

  changeStatus = (event, value) => {
    event.preventDefault()
    this.setState({
      status: value
    })
  }

  HandleClose = () => {
    this.setState({
      open: false,
      errorMessage: null
    })
  }

  componentWillMount() {
    axios
      .post('/finduser')
      .then(res => {
        if(res.data.err) {
          this.setState({
            errorMessage: res.data.message,
          })
        }
        else {
          this.setState({
            errorMessage: null,
            tableData: res.data.users
          })
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.message
        })
      })
    return false
  }

  adduser(event) {
    event.preventDefault()
    const username = ReactDOM.findDOMNode(this.refs.username).value
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const worknumber = ReactDOM.findDOMNode(this.refs.worknumber).value
    const password = ReactDOM.findDOMNode(this.refs.password).value
    const vpassword = ReactDOM.findDOMNode(this.refs.vpassword).value
    const birthday = ReactDOM.findDOMNode(this.refs.birthday).value
    const gender = this.state.gender
    const status = this.state.status

    axios
      .post('/adduser', {username, name, worknumber, password, vpassword, birthday, gender, status})
      .then(res => {
        if(res.data.error) {
          this.setState({
            errorMessage: res.data.message
          })
        }
        else {
          this.setState({
            errorMessage: res.data.message,
            tableData: this.state.tableData.concat([{username, name, worknumber, password, birthday, gender, status: status === 'Yes' ? 1 : 0}]),
            open: false
          })
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
      <div>
        <Paper zDepth={2}>
          <Table
            height={this.state.height}
            fixedHeader={true}
            fixedFooter={false}
            selectTable={false}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="book list" style={{textAlign: 'center'}}>
                  User List
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The username">Username</TableHeaderColumn>
                <TableHeaderColumn tooltip="The work number">Work number</TableHeaderColumn>
                <TableHeaderColumn tooltip="The name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The birthday">Birthday</TableHeaderColumn>
                <TableHeaderColumn tooltip="The gender">Gender</TableHeaderColumn>
                <TableHeaderColumn tooltip="Is super user?">Super user</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.tableData.map( (row, index) => (
                <TableRow key={index} >
                  <TableRowColumn>{row.username}</TableRowColumn>
                  <TableRowColumn>{row.worknumber}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.birthday}</TableRowColumn>
                  <TableRowColumn>{row.gender}</TableRowColumn>
                  <TableRowColumn>{row.status === 1 ? 'Yes' : 'No'}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider/>
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.HandleOpen}>Add</RaisedButton>
          <Dialog
            title="add a new user"
            modal={false}
            open={this.state.open}
          >
            <Form type="horizontal" onSubmit={this.adduser}>
              {
                this.state.errorMessage
                  ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
                  : null
              }
              <FormField label="Username" htmlFor="horizontal-form-input-username">
                <FormInput type="username" placeholder="Entry Username" name="horizontal-form-input-username" ref='username'/>
              </FormField>
              <FormField label="Name" htmlFor="horizontal-form-input-name">
                <FormInput type="name" placeholder="NAME" name="horizontal-form-input-name" ref='name'/>
              </FormField>
              <FormField label="Work Number" htmlFor="horizontal-form-input-worknumber">
                <FormInput type="number" placeholder="WORK NUMBER" name="horizontal-form-input-worknumber" ref='worknumber'/>
              </FormField>
              <FormField label="Password" htmlFor="horizontal-form-input-password">
                <FormInput type="password" placeholder="PASSWORD" name="horizontal-form-input-password" ref='password'/>
              </FormField>
              <FormField label="Verify Password" htmlFor="horizontal-form-input-vpassword">
                <FormInput type="password" placeholder="VERIFY PASSWORD" name="horizontal-form-input-vpassword" ref='vpassword'/>
              </FormField>
              <FormField label="Birthday" htmlFor="horizontal-form-input-birthday">
                <FormInput type="birthday" placeholder="BIRTHDAY(year-month-day)" name="horizontal-form-input-birthday" ref='birthday'/>
              </FormField>
              <FormField label="Gender">
                <RadioButtonGroup name="gender" onChange={this.changeGender}>
                  <RadioButton value="male" label="male" />
                  <RadioButton value="female" label="female" />
                </RadioButtonGroup>
              </FormField>
              <FormField label="Is super manager?">
              <RadioButtonGroup name="super_manager" onChange={this.changeStatus}>
                <RadioButton value="Yes" label="Yes" />
                <RadioButton value="No" label="No" />
              </RadioButtonGroup>
              </FormField>
              <FlatButton label="Cancel" primary={true} onTouchTap={this.HandleClose} />
              <Button type="primary" submit>Submit</Button>
            </Form>
          </Dialog>
        </Paper>
      </div>
    )
  }
}
