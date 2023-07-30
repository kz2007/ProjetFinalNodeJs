import "../App.css";
import NavBar from "./NavBar";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setCurrentUser } from "./Redux/Actions/actions";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";

function ShoppingCart(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");

  const [Password, setPassword] = useState("");

  let HandleSubmit = (event) => {
    event.preventDefault();
    console.log(Username, Password);
    axios
      .post("http://localhost:3000/request-type", {
        Username: Username,
        PasswordHash: Password,
        Operation: 2,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data != "Password is incorrect")
          dispatch(
            setCurrentUser({
              Username: Username,
              PasswordHash: Password,
            })
          );
      });
  };

  const allData = useSelector((state) => state).allProducts;
  const currentUser = allData.CurrentUser;

  return (
    <>
      {" "}
      <NavBar />{" "}
      <div className="SignIn">
        <h1>Log In: </h1>
        <form className="SignInForm" onSubmit={HandleSubmit}>
          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username: "
          ></input>
          <br />
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password: "
          ></input>
          <br />
          <button type="submit">Log In</button>
        </form>
        {currentUser ? (
          <h1
            style={{
              display: currentUser.Username === "admin" ? "inherit" : "none",
            }}
          >
            Admin
          </h1>
        ) : (
          <h1></h1>
        )}
      </div>
    </>
  );
}

export default ShoppingCart;
