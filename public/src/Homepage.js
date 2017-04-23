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
    this.addBook = this.addBook.bind(this)
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

  sellBook = () => {
    
  }

  componentWillMount() {
    axios
      .post(config.host + '/findbooks')
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
            <TableBody>
              {tableData.map( (row, index) => (
                row.status === 1 ?
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
          <RaisedButton primary={true} style={styles.button} onTouchTap={this.sellBook}>Sell</RaisedButton>
        </Paper>
      </div>
    )
  }
}
