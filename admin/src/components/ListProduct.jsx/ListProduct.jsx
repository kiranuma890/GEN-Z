import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/Ecommerce_Assets/Assets/Admin_Assets/cross_icon.png";
import "./ListProduct.css";

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch(`${import.meta.env.VITE_APP_API_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch(`${import.meta.env.VITE_APP_API_URL}/removeproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>All products list</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>OLd price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <React.Fragment key={product.id || index}>
              {" "}
              <div
                // key={index || product.id}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={product.image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                onClick={()=>{remove_product(product.id)}}
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                />
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
