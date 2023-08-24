import React, { Fragment } from "react";
import _ from "lodash";
import { Pagination as PaginationComp, Form } from "react-bootstrap";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

const Pagination = (props) => {
  const {
    pageSize,
    itemCount,
    currentPage,
    onPageChange,
    onPageSizeChange,
  } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  return (
    <Fragment>
      <div className="row">
        <div className="col-1">
          <Form.Group>
            <Form.Control
              as="select"
              defaultValue={pageSize}
              onChange={(e) => onPageSizeChange(e.currentTarget.value)}
            >
              <option value="10">10 Rows</option>
              <option value="20">20 Rows</option>
              <option value="50">50 Rows</option>
              <option value="100">100 Rows</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col-6">
          <PaginationComp variant="secondary" size="sm">
            {/* <PaginationComp.First onClick={() => onPageChange(1)} /> */}
            <PaginationComp.Prev
              onClick={() =>
                onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)
              }
            />

            {pages.map((page, index) => (
              <PaginationComp.Item
                key={index}
                onClick={() => onPageChange(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </PaginationComp.Item>
            ))}

            <PaginationComp.Next
              onClick={() =>
                onPageChange(
                  currentPage < pageCount ? currentPage + 1 : currentPage
                )
              }
            />
            {/* <PaginationComp.Last onClick={() => onPageChange(pages.length)} /> */}
          </PaginationComp>
        </div>
      </div>
    </Fragment>
  );
};

export default Pagination;
