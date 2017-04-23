import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Paper, RaisedButton, Divider, FlatButton} from 'material-ui'
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import {Form, FormField, FormInput, Alert, Button} from 'elemental'

const styles = {
  containerStyle: {
    margin: '20px auto',
    width: 800
  },
  button: {
    margin: 12
  }
}

var tableData = []

export default class extends Component {
  constructor() {
    super()
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

  componentDidMount() {
    axios
      .post('/findbooks')
      .then(res => {
        if(res.data.err) {
          this.setState({
            errorMessage: res.data.errorMessage,
          })
          tableData = res.data.books
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.message
        })
      })
  }

  addBook(event) {
    const isbn = ReactDOM.findDOMNode(this.refs.isbn).value
    const number = ReactDOM.findDOMNode(this.refs.number).value
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const author = ReactDOM.findDOMNode(this.refs.author).value
    const publishing_house = ReactDOM.findDOMNode(this.refs.publishing_house).value

    axios
      .post('/addBook', {isbn, number, name, author, publishing_house})
      .then(res => {
        if(res.data.error) {
          this.setState({
            errorMessage: res.data.errorMessage
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
            selectTable={true}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn colSpan="5" tooltip="book list" style={{textAlign: 'center'}}>
                  Book List
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The ISBN">ISBN</TableHeaderColumn>
                <TableHeaderColumn tooltip="The number">Number</TableHeaderColumn>
                <TableHeaderColumn tooltip="The name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The author">Author</TableHeaderColumn>
                <TableHeaderColumn tooltip="The publishing house">publishing_house</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map( (row, index) => (
                <TableRow key={index} >
                  <TableRowColumn>{row.isbn}</TableRowColumn>
                  <TableRowColumn>{row.number}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.author}</TableRowColumn>
                  <TableRowColumn>{row.publishing_house}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider/>
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.HandleOpen}>Add</RaisedButton>
          <Dialog
            title="Add a new book"
            modal={false}
            open={this.state.open}
          >
            <Form type="horizontal" onSubmit={this.addBook}>
              {
                this.state.errorMessage
                  ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
                  : null
              }
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
              <Button type="primary" submit>Submit</Button>
            </Form>
          </Dialog>
          <RaisedButton primary={true} style={styles.button}>Delete</RaisedButton>
        </Paper>
      </div>
    )
  }
}
