import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Paper, RaisedButton, Divider, FlatButton} from 'material-ui'
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import {Form, FormField, FormInput, Alert, Button} from 'elemental'
import config from '../../config/index.json'

const styles = {
  button: {
    margin: 12
  }
}

var tableData = []

export default class extends Component {
  constructor() {
    super()
    this.addbook = this.addbook.bind(this)
    this.state = {
      height: '600px',
      open: false,
      errorMessage: null
    }
  }

  HandleOpen = () => {
    this.setState({
      open: true
    })
  }

  HandleClose = () => {
    this.setState({
      open: false
    })
  }

  componentWillMount() {
    axios
      .post(config.host + '/finduser')
      .then(res => {
        if(res.data.err) {
          this.setState({
            errorMessage: res.data.message,
          })
        }
        tableData = res.data.books
        this.forceUpdate()
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

    if(!this.errorMessage) window.location.pathname = '/'
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
            <TableHeader>
              <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="book list" style={{textAlign: 'center'}}>
                  User List
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The username">Username</TableHeaderColumn>
                <TableHeaderColumn tooltip="The work number">Work number</TableHeaderColumn>
                <TableHeaderColumn tooltip="The name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The age">Age</TableHeaderColumn>
                <TableHeaderColumn tooltip="The gender">Gender</TableHeaderColumn>
                <TableHeaderColumn tooltip="Is super user?">Super user</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map( (row, index) => (
                <TableRow key={index} >
                  <TableRowColumn>{row.username}</TableRowColumn>
                  <TableRowColumn>{row.worknumber}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.age}</TableRowColumn>
                  <TableRowColumn>{row.gender}</TableRowColumn>
                  <TableRowColumn>{row.status === 1 ? 'Yes' : 'No'}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider/>
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.HandleOpen}>Add</RaisedButton>
          <Dialog
            title="import a new book"
            modal={false}
            open={this.state.open}
          >
            <Form type="horizontal" onSubmit={this.adduser}>
              {
                this.state.errorMessage
                  ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
                  : null
              }
              /*
              <FormField label="ISBN" htmlFor="horizontal-form-input-isbn">
                <FormInput type="isbn" placeholder="ISBN" name="horizontal-form-input-isbn" ref='isbn'/>
              </FormField>
              <FormField label="Number" htmlFor="horizontal-form-input-number">
                <FormInput type="number" placeholder="NUMBER" name="horizontal-form-input-number" ref='number'/>
              </FormField>
              <FormField label="Name" htmlFor="horizontal-form-input-name">
                <FormInput type="name" placeholder="NAME" name="horizontal-form-input-name" ref='name'/>
              </FormField>
              <FormField label="Author" htmlFor="horizontal-form-input-author">
                <FormInput type="author" placeholder="AUTHOR" name="horizontal-form-input-author" ref='author'/>
              </FormField>
              <FormField label="Publishing House" htmlFor="horizontal-form-input-publishing_house">
                <FormInput type="publishing_house" placeholder="PUBLISHING HOUSE" name="horizontal-form-input-publishing_house" ref='publishing_house'/>
              </FormField>
              <FlatButton label="Cancel" primary={true} onTouchTap={this.HandleClose} />
              */
              <Button type="primary" submit>Submit</Button>
            </Form>
          </Dialog>
        </Paper>
      </div>
    )
  }
}
