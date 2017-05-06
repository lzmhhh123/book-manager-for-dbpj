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
    this.sellBook = this.sellBook.bind(this)
    this.editBook = this.editBook.bind(this)
    this.state = {
      height: '600px',
      open: false,
      open1: false,
      errorMessage: null,
      tableData: []
    }
  }

  HandleOpen = () => {
    this.setState({
      open: true
    })
  }

  HandleOpen1 = () => {
    this.setState({
      open1: true
    })
  }

  HandleClose = () => {
    this.setState({
      open: false
    })
  }

  HandleClose1 = () => {
    this.setState({
      open1: false
    })
  }

  editBook(event) {
    const isbn = ReactDOM.findDOMNode(this.refs.isbn1).value
    const name = ReactDOM.findDOMNode(this.refs.name1).value
    const author = ReactDOM.findDOMNode(this.refs.author1).value
    const publishing_house = ReactDOM.findDOMNode(this.refs.publishing_house1).value
    const price = ReactDOM.findDOMNode(this.refs.price1).value
    axios
      .post('/editBook', {isbn, name, author, publishing_house, price})
      .then(res => {
        if(res.data.err) {
          this.setState({
            errorMessage: res.data.message
          })
        }
        else {
          let cnt = 0
          for(let i = 0; i < this.state.tableData.length; ++i) {
            if(this.state.tableData[i].isbn === isbn) {
              cnt = i
              break
            }
          }
          if(name) this.state.tableData[cnt].name = name
          if(author) this.state.tableData[cnt].author = author
          if(publishing_house) this.state.tableData[cnt].publishing_house = publishing_house
          if(price) this.state.tableData[cnt].price = price
          this.setState({
            errorMessage: null,
            open1: false
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

  sellBook(event) {
    const number = ReactDOM.findDOMNode(this.refs.number).value
    const isbn = ReactDOM.findDOMNode(this.refs.isbn).value
    axios
      .post('/sellbook', {number, isbn})
      .then(res => {
        if(res.data.err) {
          this.setState({
            errorMessage: res.data.message
          })
        }
        else {
          let cnt = 0
          for(let i = 0; i < this.state.tableData.length; ++i) {
            if(this.state.tableData[i].isbn === isbn) {
              cnt = i
              break
            }
          }
          this.state.tableData[cnt].number -= number
          this.setState({
            errorMessage: null,
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
            errorMessage: null,
            tableData: res.data.books
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
            selectable={false}
            onRowSelection={this.HandleSelection}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="book list" style={{textAlign: 'center'}}>
                  Paid Book List
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
            <TableBody displayRowCheckbox={false}>
              {this.state.tableData.map( (row, index) => (
                row.status === 1 ?
                <TableRow key={index}>
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
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.HandleOpen} >Sell</RaisedButton>
          <Dialog
            title="how many to sell?"
            modal={false}
            open={this.state.open}
          >
            <Form type="horizontal" onSubmit={this.sellBook}>
              {
                this.state.errorMessage
                  ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
                  : null
              }
              <FormField label="ISBN" htmlFor="horizontal-form-input-isbn">
                <FormInput type="isbn" placeholder="Which book to sell?" name="horizontal-form-input-isbn" ref='isbn'/>
              </FormField>
              <FormField label="Number" htmlFor="horizontal-form-input-number">
                <FormInput type="number" placeholder="Number of sells" name="horizontal-form-input-number" ref='number'/>
              </FormField>
              <FlatButton label="Cancel" primary={true} onTouchTap={this.HandleClose} />
              <Button type="primary" submit>Submit</Button>
            </Form>
          </Dialog>
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.HandleOpen1} >Edit</RaisedButton>
          <Dialog
            title="how many to sell?"
            modal={false}
            open={this.state.open1}
          >
            <Form type="horizontal" onSubmit={this.editBook}>
              {
                this.state.errorMessage
                  ? <Alert type="danger"><strong>Error:</strong> {this.state.errorMessage}</Alert>
                  : null
              }
              <FormField label="ISBN" htmlFor="horizontal-form-input-isbn">
                <FormInput type="isbn" placeholder="Which book to edit?" name="horizontal-form-input-isbn" ref='isbn1'/>
              </FormField>
              <FormField label="Name" htmlFor="horizontal-form-input-name">
                <FormInput type="name" placeholder="Edit name not necessary." name="horizontal-form-input-name" ref='name1'/>
              </FormField>
              <FormField label="Author" htmlFor="horizontal-form-input-author">
                <FormInput type="author" placeholder="Edit author not necessary." name="horizontal-form-input-author" ref='author1'/>
              </FormField>
              <FormField label="Publishing house" htmlFor="horizontal-form-input-publishing_house">
                <FormInput type="publishing_house" placeholder="Edit author not necessary." name="horizontal-form-input-publishing_house" ref='publishing_house1'/>
              </FormField>
              <FormField label="Price" htmlFor="horizontal-form-input-price">
                <FormInput type="number" placeholder="Edit price not necessary." name="horizontal-form-input-price" ref='price1'/>
              </FormField>
              <FlatButton label="Cancel" primary={true} onTouchTap={this.HandleClose1} />
              <Button type="primary" submit>Submit</Button>
            </Form>
          </Dialog>
        </Paper>
      </div>
    )
  }
}
