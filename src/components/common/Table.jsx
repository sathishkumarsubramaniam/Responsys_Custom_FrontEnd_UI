import _ from "lodash";
import React, { Component, Fragment } from "react";
import Pagination, { paginate } from "./Pagination";
import { Table as TableComp, Col } from "react-bootstrap";

class Table extends Component {
  state = {
    pageSize: 50,
    currentPage: 1,
    sortColumn: { path: this.props.primarySort, order: this.props.order },
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePageSizeChange = (pageSize) => {
    this.setState({ pageSize, currentPage: 1 });
  };

  handleOnSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn, currentPage: 1 });
  };

  renderCell = (item, column, dataIndex) => {
    if (column.content) return column.content(item, dataIndex);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    const { pageSize, currentPage, sortColumn } = this.state;
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    const items = paginate(sorted, currentPage, pageSize);

    return (
      <Fragment>
        <Col md={12}>
          <TableComp striped bordered hover responsive className="panel-grey">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    onClick={() => this.handleOnSort(column.path)}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      {this.renderCell(item, column, itemIndex)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </TableComp>
        </Col>
        <Col md={12}>
          <Pagination
            pageSize={pageSize}
            currentPage={currentPage}
            itemCount={data.length}
            onPageChange={this.handlePageChange}
            onPageSizeChange={this.handlePageSizeChange}
          />
        </Col>
      </Fragment>
    );
  }
}

export default Table;
