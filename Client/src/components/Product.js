import "../App.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faStar,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";


  let Product = (props) => {

    const navigate = useNavigate();

    const AllData = useSelector((state) => state).allProducts;
    const ProductsData = AllData.Products;

    let index = parseInt(props.index.replace("p-", ""));
    if (index > -1) {
      let [title, type, , filename, , , price, rating, id] = Object.values(
        ProductsData[index]
      );
      let discount = 0;
      let oldPriceShown, priceShown;
      if (discount <= 0) {
        priceShown = price;
        oldPriceShown = "";
      } else {
        priceShown = (price / 100) * (100 - discount);
        oldPriceShown = price;
      }
      return (
        <div className="Product">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/SingleProduct/" + id)}
          >
            <img
              src={filename}
              style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
            />
            <div className="textProduct">
              <h4>{title}</h4>
              <h5>{type}</h5>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>
                  {" "}
                  {rating}
                  <FontAwesomeIcon icon={faStar} style={{ color: "#EEC373" }} />
                </h3>
                <h3>
                  {priceShown} <s>{oldPriceShown}</s> $
                </h3>
              </div>
              <small>#{id}</small>
            </div>
          </a>
        </div>
      );
    }
  };

export default Product;