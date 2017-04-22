import React, { Component } from 'react'
import axios from 'axios'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'

const styles = {
  containerStyle: {
    margin: '20px auto',
    width: 800
  }
}

var tableData = []

export default class extends Component {
  constructor() {
    super()
    this.state = {
      height: '800px',
      errorMessage: null
    }
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

  render() {
    return (
      <div>
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
      </div>
    )
  }
}
