import React from "react";
import "./AddProduct.css";
import upload_area from "../../assets/Ecommerce_Assets/Assets/Admin_Assets/upload_area.svg";
import { useState } from "react";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const add_product = async () => {
    console.log(productDetails);

    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch(`${import.meta.env.VITE_APP_API_URL}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("🌐 Upload response from backend:"), (responseData = data);
      });
    console.log("API URL:", import.meta.env.VITE_APP_API_URL);

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);

      await fetch(`${import.meta.env.VITE_APP_API_URL}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="type here"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="select">Select</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          add_product();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
