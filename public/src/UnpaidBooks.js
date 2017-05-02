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

export default class extends Component {
  constructor() {
    super()
    this.addBook = this.addBook.bind(this)
    this.payBook = this.payBook.bind(this)
    this.cancelBook = this.cancelBook.bind(this)
    this.state = {
      height: '600px',
      open: false,
      errorMessage: null,
      selectNumber: null,
      tableData: []
    }
  }

  HandleSelection = (key) => {
    if(typeof(key[0]) === 'undefined') {
      this.setState({
        selectNumber: null
      })
    }
    else {
      this.setState({
        selectNumber: key[0]
      })
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
      .post('/findbooks')
      .then(res => {
        if(res.data.err) {
          this.setState({
            errorMessage: res.data.message,
          })
        }
        else {
          this.setState({
            tableData: res.data.books,
            errorMessage: null
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

  addBook(event) {
    event.preventDefault()
    const isbn = ReactDOM.findDOMNode(this.refs.isbn).value
    const number = ReactDOM.findDOMNode(this.refs.number).value
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const author = ReactDOM.findDOMNode(this.refs.author).value
    const publishing_house = ReactDOM.findDOMNode(this.refs.publishing_house).value
    const price = ReactDOM.findDOMNode(this.refs.price).value

    axios
      .post(config.host+'/addbook', {isbn, number, name, author, publishing_house, price})
      .then(res => {
        if(res.data.error) {
          this.setState({
            errorMessage: res.data.message
          })
        }
        else {
          this.setState({
            errorMessage: null,
            open: false,
            tableData: this.state.tableData.concat([{isbn, number, name, author, publishing_house, price, status: 0}])
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

  payBook = () => {
    let cnt = 0
    for(let i = 0; i < this.state.tableData.length; i++) {
      if(!this.state.tableData[i].status) cnt++
      if(cnt === this.state.selectNumber + 1) {
        cnt = i
        break
      }
    }
    const isbn = this.state.tableData[cnt].isbn
    axios
      .post('/paybook', {isbn})
      .then(res => {
        if(res.data.error) {
          this.setState({
            errorMessage: res.data.message
          })
        }
        else {
          this.state.tableData.splice(cnt, 1)
          this.setState({
            errorMessage: null
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

  cancelBook = () => {
    let cnt = 0
    for(let i = 0; i < this.state.tableData.length; i++) {
      if(!this.state.tableData[i].status) cnt++
      if(cnt === this.state.selectNumber + 1) {
        cnt = i
        break
      }
    }
    const isbn = this.state.tableData[cnt].isbn
    axios
      .post('/cancelbook', {isbn})
      .then(res => {
        if(res.data.error) {
          this.setState({
            errorMessage: res.data.message
          })
        }
        else {
          this.state.tableData.splice(cnt, 1)
          this.setState({
            errorMessage: null
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
            onRowSelection={this.HandleSelection}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="book list" style={{textAlign: 'center'}}>
                  Unpaid Book List
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The ISBN">ISBN</TableHeaderColumn>
                <TableHeaderColumn tooltip="The number">Number</TableHeaderColumn>
                <TableHeaderColumn tooltip="The name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The author">Author</TableHeaderColumn>
                <TableHeaderColumn tooltip="The publishing house">Publishing_house</TableHeaderColumn>
                <TableHeaderColumn tooltip="The price">Price</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.tableData.map( (row, index) => (
                row.status === 0 ?
                <TableRow key={index} >
                  <TableRowColumn>{row.isbn}</TableRowColumn>
                  <TableRowColumn>{row.number}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.author}</TableRowColumn>
                  <TableRowColumn>{row.publishing_house}</TableRowColumn>
                  <TableRowColumn>{row.price}</TableRowColumn>
                </TableRow> : null
              ))}
            </TableBody>
          </Table>
          <Divider/>
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.HandleOpen}>Import</RaisedButton>
          <Dialog
            title="import a new book"
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
              <FormField label="Price" htmlFor="horizontal-form-input-price">
                <FormInput type="numer" placeholder="PRICE" name="horizontal-form-input-price" ref='price'/>
              </FormField>
              <FlatButton label="Cancel" primary={true} onTouchTap={this.HandleClose} />
              <Button type="primary" submit>Submit</Button>
            </Form>
          </Dialog>
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.payBook} disabled={this.state.selectNumber === null ? true : false} >Pay</RaisedButton>
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.cancelBook} disabled={this.state.selectNumber === null ? true : false} >Cancel order</RaisedButton>
        </Paper>
      </div>
    )
  }
}
