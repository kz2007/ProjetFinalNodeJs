import "./App.css";
import Home from "./components/Home";
import ProductsPage from "./components/ProductsPage";
import { Routes, Route } from "react-router-dom";
import ProductDescription from "./components/ProductDescription";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts} from './components/Redux/Actions/actions'
import ShoppingCart from "./components/ShoppingCart";
import SignIn from "./components/SignIn";
import LogIn from "./components/LogIn";
import Orders from "./components/Orders";

function App() {
  const dispatch = useDispatch()

  const fetchProducts = async () => {
    const response = await axios
      .get("https://api4286.s3.ap-south-1.amazonaws.com/products.json")
      .catch(function (error) {
        // handle error
        console.log(error);
      });
      dispatch(setProducts(response.data));
  };

  useEffect(()=>{fetchProducts()}, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductPage" element={<ProductsPage />} />
        <Route path="/SingleProduct/:id" element={<ProductDescription />} />
        <Route path="/ShoppingCart/" element={<ShoppingCart />} />
        <Route path="/SignIn/" element={<SignIn />} />
        <Route path="/LogIn/" element={<LogIn />} />
        <Route path="/Orders/" element={<Orders />}></Route>
      </Routes>
    </div>
  );
}

export default App;
