import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import '../Header/Header.scss';
class Datatable extends Component {
  render() {
    const fakeData = this.props.data.map((user)=> {
      return {
        ...user,
        first_name: 'abubakar',
        last_name: 'sajid',
        middle_name: 'sajid'
      }
    })

    return (
      <DataTable
        columns={this.props.columns}
        data={fakeData}
        selectableRows
        onSelectedRowsChange={this.props.handleSelected}
        pagination
        noTableHead = {false}
        // paginationServer
        // expandableRows
        onRowClicked={this.props.onRowClicked}
        pointerOnHover
        selectableRowsHighlight = {true}
        striped
        responsive
        conditionalRowStyles={this.props.conditionalRowStyles}
        subHeader
        customStyles={{
          cells: {
            style: {
              color: '#6A6A6A',
              fontSize: 14,
              fontWeight: '600 !important',
              fontFamily: 'unset',
              border: 'none',
            },
          },
          headCells: {
            style: {
              fontWeight: 700,
              fontSize: 'medium',
              color: '#6A6A6A',
            },
          },
        }}
      />
    );
  }
}

export default Datatable;
