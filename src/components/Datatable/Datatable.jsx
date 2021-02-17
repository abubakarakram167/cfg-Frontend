import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

class Datatable extends Component {
  render() {
    return (
      <DataTable
        columns={this.props.columns}
        data={this.props.data}
        selectableRows
        onSelectedRowsChange={this.props.handleSelected}
        pagination
        // paginationServer
        // expandableRows
        onRowClicked={this.props.onRowClicked}
        pointerOnHover
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
              fontWeight: 600,
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
