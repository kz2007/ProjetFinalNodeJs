import "../App.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowUp,
  faArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeProductInCart } from "./Redux/Actions/actions";
import { useState, useReducer } from "react";

let ShoppingCartProduct = (props) => {
  const dispatch = useDispatch();

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const AllData = useSelector((state) => state).allProducts;
  const ProductsData = AllData.Products;
  const CartProducts = AllData.ShoppingCart;

  let [cartDetails, setCartDetails] = useState(
    CartProducts.find((product) => product.id === props.index)
  );
  let tempCart = cartDetails;
  let index = parseInt(props.index.replace("p-", ""));
  if (index > -1) {
    let [title, type, , filename, , , price, rating, id] = Object.values(
      ProductsData[index]
    );

    let updateCart = (nCount) => {
      tempCart = AllData.ShoppingCart;
      let objIndex = tempCart.findIndex((obj) => obj.id == props.index);
      if (tempCart[objIndex].count + nCount > 0)
        tempCart[objIndex].count += nCount;

      dispatch(changeProductInCart(tempCart));

      setCartDetails(tempCart[objIndex]);
      console.log(cartDetails.count);

      forceUpdate();
    };

    if(cartDetails.count){
        return (

        
            <div className="ShoppingCartProduct">
              <img src={filename} style={{ height: "200px", margin: "16px" }} />
              <div
                className="CartTextProduct"
                style={{ height: "10%", margin: "16px" }}
              >
                <h3>
                  {title} (<i>{type}</i>)
                </h3>
                <div>
                  <h3>
                    {rating}
                    <FontAwesomeIcon icon={faStar} style={{ color: "#EEC373" }} />
                  </h3>
                  <h2>{price}$</h2>
                  <small>#{id}</small>
                </div>
              </div>
              <div className="CountChange">
                <h2 style={{ marginRight: "20px" }}> {cartDetails.count}</h2>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => {
                      updateCart(1);
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    onClick={() => {
                      updateCart(-1);
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                </div>
              </div>
              <button
                style={{ height: "fit-content", margin: "auto 20px" }}
                onClick={() => {
                  tempCart = AllData.ShoppingCart;
                  let objIndex = tempCart.findIndex((obj) => obj.id == props.index);
                  tempCart[objIndex].count = 0;
            
                  dispatch(changeProductInCart(tempCart));
            
                  setCartDetails(tempCart[objIndex]);
            
                  forceUpdate();
      
                }}
              >
                {" "}
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          );
    }
    
  }
};

export default ShoppingCartProduct;
