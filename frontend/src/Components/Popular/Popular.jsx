import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularproducts, setPopularproducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/popularinwomen`)
      .then((res) => res.json())
      .then((data) => setPopularproducts(data));
    console.log("API URL:", process.env.REACT_APP_API_URL);
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularproducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
