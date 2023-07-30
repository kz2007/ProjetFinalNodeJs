import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"

function NavBar() {
  const navigate = useNavigate(); 
  const AllData = useSelector((state) => state).allProducts;
  
  const CurrentUser = (AllData.CurrentUser)?(AllData.CurrentUser):"";
  return (
    <>
      <nav className="NavBar">
        <>
            <a className="LogoDiv" style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/")}>
                <img src="../Images/Logo.png" style={{height: 52, paddingBottom: 16}} />
                <h1>My Store</h1>
            </a>
            <div className="LinkDiv">
            <a style={{ cursor: "pointer",  textDecoration: "underline"  }}
            onClick={() => navigate("/ProductPage/")}>Products </a>
            <a style={{ cursor: "pointer",  textDecoration: "underline"  }}
            onClick={() => navigate("/LogIn/")}>Log-in </a>
            <a style={{ cursor: "pointer",  textDecoration: "underline"  }}
            onClick={() => navigate("/Signin/")}>Sign-in </a>
            <a style={{ cursor: "pointer",  textDecoration: "underline", display: (CurrentUser.Username == "admin" ? "inherit" : "none")}}
            onClick={() => navigate("/Orders/")}>Orders </a>
            <a style={{ cursor: "pointer",  textDecoration: "underline"  }}
            onClick={() => navigate("/ShoppingCart/")}><FontAwesomeIcon icon={faShoppingCart} style={{fontSize: 24}}/></a>
            </div>
        </>
      </nav>
    </>
  );
}

export default NavBar;