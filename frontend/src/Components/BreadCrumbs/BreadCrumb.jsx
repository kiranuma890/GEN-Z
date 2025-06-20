import React from "react";
import "./BreadCrumb.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const BreadCrumb = ({product={}}) => {
  const {category,name} = product;
  return (
    <div className="breadcrumbs">
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />
      {category} <img src={arrow_icon} alt="" /> {name}
    </div>
  );
};

export default BreadCrumb;
