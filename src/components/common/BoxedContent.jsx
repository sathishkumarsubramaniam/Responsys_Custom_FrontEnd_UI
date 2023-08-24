import React from "react";

const BoxedContent = (props) => {
  const { title, children } = props;

  return (
    <div className="ibox">
      {title ? (
        <div className="ibox-title text-success font-bold">
          <h5>{title}</h5>
        </div>
      ) : (
        ""
      )}
      <div className="ibox-content">{children}</div>
    </div>
  );
};

export default BoxedContent;
