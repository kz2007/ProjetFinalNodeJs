import "../App.css";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Products from "./Products";

function ProductPage(props) {
  return(
<div className="ProductPage">
    <div className="MainProductPage">
    <NavBar />
    <h1 style={{textAlign: "center", color: "#856143"}}>Products</h1>
    <Products limit={30}/>
    </div>
</div>
  ) ;
}

export default ProductPage;
