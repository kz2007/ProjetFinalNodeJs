import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faStar,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

import Product from "./Product";

function Products(props) {
  const AllData = useSelector((state) => state).allProducts;
  const ProductsData = AllData.Products;
  const Search = AllData.Search;

  const [CurrentPage, setPage] = useState(0);
  const [PreviousPageButtonState, setPreviousButton] = useState(true);
  const [NextPageButtonState, setNextButton] = useState(false);
  let showProducts = [];

  let FilterBySearch = () => {
    if (ProductsData.length > 0) {
      if (Search === "") {
        for (
          let i = 0;
          i <= Math.floor(ProductsData.length / props.limit);
          i++
        ) {
          showProducts.push([<div></div>]);
        }
        ProductsData.map((product, i) => {
          showProducts[Math.floor(i / props.limit)][i % props.limit] = (
            <Product index={product.id} key={i} />
          );
        });
      } else {
        const filterData = () =>
          ProductsData.filter((product) => (product.type.includes(Search) || product.description.includes(Search) || product.title.includes(Search)));
        let filteredData = filterData();

        for (let i = 0; i <= Math.floor(filteredData.length / props.limit); i++)
          showProducts.push([<div></div>]);

        filteredData.map((product, i) => {
          showProducts[Math.floor(i / props.limit)][i % props.limit] = (
            <Product index={product.id} key={i} />
          );
        });
      }
    }
  };

  FilterBySearch();


  const NextPage = () => {
    if (CurrentPage < showProducts.length - 1) {
      setPage(CurrentPage + 1);
      window.location = "#Top";
    } else setPreviousButton(true);

    setPreviousButton(false);
  };

  const PreviousPage = () => {
    if (CurrentPage) {
      setPage(CurrentPage - 1);
      window.location = "#Top";
    } else setPreviousButton(true);

    setNextButton(false);
  };

  return (
    <div className="Products">
      <SearchBar />
      <div className="ProductsDisplay" id="Top">
        {showProducts[CurrentPage]}
      </div>

      <div className="ProductsPagesNavButtons">
        <button onClick={PreviousPage} disabled={PreviousPageButtonState}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <label style={{ color: "#856143", fontSize: "2rem" }}>
          {CurrentPage}
        </label>
        <button onClick={NextPage} disabled={NextPageButtonState}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}

export default Products;
