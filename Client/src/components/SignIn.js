import "../App.css";
import NavBar from "./NavBar";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState} from "react";
import axios from "axios";

function ShoppingCart(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Username, setUsername] = useState("")
  
  const [Password, setPassword] = useState("")

  let HandleSubmit = (event) => {
  event.preventDefault()
  console.log(Username, Password)
  axios.post("http://localhost:3000/request-type", {
    Username: Username,
   PasswordHash: Password,
   Operation: 1
   })
  .then((response) => {
    console.log(response);
    navigate('/LogIn/')
  });
  }

  return (
    <>
      {" "}
      <NavBar />{" "}
      <div className="SignIn">
        <h1>Sign In: </h1>
        <form className="SignInForm" onSubmit={HandleSubmit}>
        <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Username: "></input><br />
        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: "></input><br />
        <button type="submit">Sign In</button>
      </form>
      </div>
    </>
  );
}

export default ShoppingCart;
