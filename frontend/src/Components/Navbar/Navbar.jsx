import { useContext, useRef, useState } from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from "../Assets/dropdown_png.png"

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalItem } = useContext(ShopContext);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(ShopContext);
  const menuRef = useRef();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const dropdown_toggle = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }


  return (
    <div className="Navbar">
      {console.log("Navbar user:", user)}
      <div>
        <h1>GEN-Z</h1>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={dropdown_icon} alt="" />
      <ul ref={menuRef} className="Nav-menu">
        <li
          onClick={() => {
            setMenu("Shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Shop
          </Link>
          {menu === "Shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Men");
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} to="/Men">
            Men
          </Link>{" "}
          {menu === "Men" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Women");
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} to="/Women">
            Women
          </Link>{" "}
          {menu === "Women" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Kids");
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} to="/Kids">
            Kids
          </Link>{" "}
          {menu === "Kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="Nav-Login-Cart">
        {isLoggedIn && user ? (
          <>
            <span className="username">Welcome, {user.name}</span>
            <Link to="/Auth">
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </>
        ) : (
          <Link to="/Auth">
            <button>Login</button>
          </Link>
        )}
        <Link to="/Cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="Cart-count">{getTotalItem()}</div>
      </div>
    </div>
  );
};

export default Navbar;
