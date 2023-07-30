import "../App.css";
import NavBar from "./NavBar";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setCurrentUser } from "./Redux/Actions/actions";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { setOrders} from './Redux/Actions/actions'
import Order from "./Order";
import { useEffect } from "react";
function Orders(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");

  const [Password, setPassword] = useState("");
     const fetchOrders = async () => {
    const response = await axios
      .get("http://localhost:3000/request-type")
      .catch(function (error) {
        // handle error
        console.log(error);
      });
      dispatch(setOrders(response.data));
  };

  useEffect(()=>{fetchOrders()}, [])


  const AllData = useSelector((state) => state).allProducts;

  return (
    <>
      {" "}
      <NavBar />{" "}
      <div className="Orders">
        <h1>Orders : </h1>

        {(AllData.CurrentUser)?(AllData.CurrentUser.Username == "admin")?(AllData.Orders)?(<div>{AllData.Orders.map((order, i) => {
    return(<Order order={order} key={i} />)
    } )} <h2 style={{color: "red"}}>Orders states can be changed directly from the server</h2> </div>): (<h2>No orders yet.</h2>):<h2 style={{color: "red"}}>To view this page you have to be an admin</h2>:<h2 style={{color: "red"}}>To view this page you have to be an admin</h2>}
    
    
      </div>
    </>
  );
}

export default Orders;
