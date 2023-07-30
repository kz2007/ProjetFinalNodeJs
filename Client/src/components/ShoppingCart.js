import "../App.css";
import NavBar from "./NavBar";
import ShoppingCartProduct from "./ShoppingCartProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeProductInCart } from "./Redux/Actions/actions";

import axios from "axios";
function ShoppingCart(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AllData = useSelector((state) => state).allProducts;
  const ProductsData = AllData.Products;
  const CartProducts = AllData.ShoppingCart;
  const CurrentUser = AllData.CurrentUser;

  function decimalAdjust(type, value, exp) {
    type = String(type);
    if (!["round", "floor", "ceil"].includes(type)) {
      throw new TypeError(
        "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
      );
    }
    exp = Number(exp);
    value = Number(value);
    if (exp % 1 !== 0 || Number.isNaN(value)) {
      return NaN;
    } else if (exp === 0) {
      return Math[type](value);
    }
    const [magnitude, exponent = 0] = value.toString().split("e");
    const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
    // Shift back
    const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
    return Number(`${newMagnitude}e${+newExponent + exp}`);
  }
  const ceil10 = (value, exp) => decimalAdjust("ceil", value, exp);

  let productsCheckCount = 0;
  let totalPrice = 0;
  let cart = CartProducts.map((product) => (
    <ShoppingCartProduct index={product.id} />
  ));
  CartProducts.map((product) => {
    productsCheckCount += product.count;
    let objIndex = ProductsData.findIndex((obj) => obj.id == product.id);
    totalPrice += product.count * ProductsData[objIndex].price;
  });

  let addOrder = function () {
    console.log(CartProducts);
    axios
      .post("http://localhost:3000/request-type", {
        order: {
          Username: CurrentUser.Username,
          Products: CartProducts,
          State: 0,
        },
        Operation: 3,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <>
      {" "}
      <NavBar />{" "}
      <div className="ShoppingCart">
        <h1>Shopping cart: </h1>
        {productsCheckCount ? (
          <>
            {cart}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>Total: {ceil10(totalPrice, -2)}$</h1>
              <button
                className="CheckOut"
                onClick={() => {
                  if (CurrentUser) {
                    addOrder();
                    dispatch(changeProductInCart([]));
                    navigate("/");
                  }
                }}
              >
                <h2>Check Out</h2>
              </button>
            </div>
          </>
        ) : (
          <h2 style={{ color: "#856143" }}> Your cart is empty .</h2>
        )}
      </div>
    </>
  );
}

export default ShoppingCart;
