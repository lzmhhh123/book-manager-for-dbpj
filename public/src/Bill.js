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
  TextField: {
    margin: 20,
    width: 400
  }
}

export default class extends Component {
  constructor() {
    super()
    this.state = {
      height: '600px',
      errorMessage: null,
      s: '',
      tableData: []
    }
  }

  search = (event, value) => {
    this.setState({
      s: value
    })
  }

  componentWillMount() {
    axios
      .post('/findbill')
      .then(res => {
        if(res.data.err) {
          this.setState({
            errorMessage: res.data.message,
          })
        }
        else {
          this.setState({
            errorMessage: null,
            tableData: res.data.bill
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
                <TableHeaderColumn colSpan="4" tooltip="bill list" style={{textAlign: 'center'}}>
                  Bill List
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The ISBN">ISBN</TableHeaderColumn>
                <TableHeaderColumn tooltip="The name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The income">Income</TableHeaderColumn>
                <TableHeaderColumn tooltip="The date">Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.tableData.map( (row, index) => (
                row.date.indexOf(this.state.s) === -1 ? null :
                <TableRow key={index}>
                  <TableRowColumn>{row.isbn}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.income}</TableRowColumn>
                  <TableRowColumn>{row.date}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TextField hintText="Time like(year or year-month)" floatingLabelText="Search" style={styles.TextField} onChange={this.search} />
        </Paper>
      </div>
    )
  }
}
