import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/cartContext";

export default function Navi() {
  let { setToken, setLogin } = useContext(userContext);
  const token = localStorage.getItem("userToken");
  const { cartNumber } = useContext(CartContext);
  const location = useLocation();
  let navigate = useNavigate();
  const isActive = (path) => {
    return location.pathname === path;
  };
  function LogOut() {
    setToken(null);
    setLogin(null);
    localStorage.removeItem("userToken");
  }
  return (
    <Navbar
      expand="lg"
      className="row mx-auto absolute"
      style={{ backgroundColor: "#2c3e50" }}
    >
      <Container className="col-md-8">
        <NavLink
          className="navbar-brand"
          to="/home"
          style={{ color: "white", fontSize: "30px", fontWeight: "bolder" }}
        >
          E-Commerce
        </NavLink>
        {token ? (
          <Nav className="me-auto">
            <NavLink
              className="nav-link"
              to="/products"
              style={{
                color: "white",
                background: isActive("/products") ? "#1abc9c" : "transparent",
                borderRadius: "10px",
              }}
            >
              Products
            </NavLink>
            <NavLink
              className="nav-link"
              to="/categories"
              style={{
                color: "white",
                background: isActive("/categories") ? "#1abc9c" : "transparent",
                borderRadius: "10px",
              }}
            >
              Categories
            </NavLink>
            <NavLink
              className="nav-link"
              to="/brands"
              style={{
                color: "white",
                background: isActive("/brands") ? "#1abc9c" : "transparent",
                borderRadius: "10px",
              }}
            >
              Brands
            </NavLink>
            <NavLink
              className="nav-link"
              to="/cart"
              style={{
                color: "white",
                background: isActive("/cart") ? "#1abc9c" : "transparent",
                borderRadius: "10px",
              }}
            >
              Cart
              <span className="badge bg-success mx-1">{cartNumber}</span>
            </NavLink>
            <NavLink
              className="nav-link"
              to="/wishlist"
              style={{
                color: "white",
                background: isActive("/wishlist") ? "#1abc9c" : "transparent",
                borderRadius: "10px",
              }}
            >
              Wishlist
            </NavLink>
            <NavLink
              className="nav-link"
              to="/allorders"
              style={{
                color: "white",
                background: isActive("/orders") ? "#1abc9c" : "transparent",
                borderRadius: "10px",
              }}
            >
              Orders
            </NavLink>
          </Nav>
        ) : null}
      </Container>
      <Container className="col-md-3">
        <div className="row d-flex align-items-center text-white">
          <i className="fab fa-facebook">
            <i className="fab fa-instagram mx-2"></i>
            <i className="fab fa-whatsapp"></i>
            <i className="fas fa-globe mx-2"></i>
          </i>
        </div>
        {token ? (
          <>
            
            <NavLink
              className="nav-link text-white "
              onClick={LogOut}
              to={"/login"}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="nav-link text-white" to="/register">
              Register
            </NavLink>
            <NavLink className="nav-link text-white px-3" to="/login">
              Login
            </NavLink>
          </>
        )}
      </Container>
    </Navbar>
  );
}
