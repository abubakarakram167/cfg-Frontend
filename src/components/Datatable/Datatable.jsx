import React, {Component} from 'react';
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

            />
        );
    }
}

export default Datatable;
