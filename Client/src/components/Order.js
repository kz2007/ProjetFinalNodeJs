import "../App.css";
import NavBar from "./NavBar";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setCurrentUser } from "./Redux/Actions/actions";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";

function Order(props) {
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
  let Processing = (<p style={{color: "Red"}}>Processing</p>)
  let InTransit = (<p style={{color: "Orange"}}>In Transit</p>)
  let Delivered = (<p style={{color: "Green"}}>Delivered</p>)
  
  return (
    <div className="Order">
        <p>Order to {props.order.Username}</p>
        <p>{(props.order.State == 0)?Processing:(props.order.State == 1)?InTransit:Delivered}</p>
        <ul>
        {
            props.order.Products.map((product, i)=>{
                return(<li>Product: {product.id} / Quantity: {product.count}</li>)
            })
        }
        </ul>
    </div>
  );
}

export default Order;
