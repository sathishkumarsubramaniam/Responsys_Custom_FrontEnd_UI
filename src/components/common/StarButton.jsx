import React from "react";

const StarButton = (props) => {
  const { item, handleClick } = props;
  const iconClass = item.starred ? "fa-star" : "fa-star-o";
  return (
    <i className={`text-warning fa ${iconClass}`} onClick={handleClick}></i>
  );
};

export default StarButton;
