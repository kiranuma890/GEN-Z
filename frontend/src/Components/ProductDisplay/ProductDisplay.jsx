import React, { useContext } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";


const ProductDisplay = ({product={}}) => {
  const { image, name, old_price, new_price } = product;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="product-display">
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
          <img src={image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img src={image} alt="" className="productdiplay-main-img" />
        </div>
      </div>
      <div className="productDisplay-right">
        <h1>{name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull} alt="" />
          <p>(144)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-old-price">${old_price}</div>
          <div className="productdisplay-right-new-price">${new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum velit
          quasi quibusdam magni! Fuga iure reprehenderit ducimus sed molestias
          earum, quam vel quis! Excepturi omnis esse possimus sint velit
          consectetur.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
          <p className="productdisplay-right-category">
            <span>Category :</span> women,T-shirt,Crop top
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span> Modern,Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
