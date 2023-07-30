import "../App.css";
import { useParams } from "react-router-dom";
import { useState, useReducer } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeProductInCart } from "./Redux/Actions/actions";

function ProductDescription() {
  
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();

  const AllData = useSelector((state) => state).allProducts;
  const ProductsData = AllData.Products;
  const CartProducts = AllData.ShoppingCart;

  let idRouter = useParams().id;


  let index = parseInt(idRouter.replace("p-", ""));

  let [title, type, description, filename, , , price, rating, id] =
    Object.values(ProductsData[index]);

  let updateCart = (nCount) => {
    let tempCart = AllData.ShoppingCart;
    let objIndex = tempCart.findIndex((obj) => obj.id == idRouter);

    if (objIndex != -1) tempCart[objIndex].count += nCount;
    else {
      tempCart.push({ id: idRouter, count: 1 });
    }

    dispatch(changeProductInCart(tempCart));

    forceUpdate();
  };
  
  



  return (
    <div>
      <NavBar />
      <div className="SingleProduct">
        <img
          src={filename}
          style={{
            height: "60%",
            marginLeft: "10%",
            marginRight: "10%",
            maxWidth: "40%",
          }}
        />
        <div className="textProduct">
          <h1> {title} </h1>
          <h2>Category: {type}</h2>
          <h3>{description}</h3>

          <h2>
            Rating :{rating}
            <FontAwesomeIcon icon={faStar} style={{ color: "#EEC373" }} />
          </h2>

          <h2>
            Price:
            {price}$
          </h2>
          <h2>#{id}</h2>

          <h2>Currently in cart: {(CartProducts.findIndex((obj) => obj.id == idRouter) != -1) ? AllData.ShoppingCart[CartProducts.findIndex((obj) => obj.id == idRouter)].count : 0}</h2>

          <button
            onClick={() => {
              updateCart(1);
            }}
          >
            <h3>Order</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
