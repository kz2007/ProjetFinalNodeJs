import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState} from "react";
import { setSearch} from './Redux/Actions/actions'
import { useDispatch } from "react-redux";

function SearchBar() {

    const [SearchS, setSearchS] = useState("")
    const dispatch = useDispatch()

    const HandleSubmit = (event) => {
        event.preventDefault();
        dispatch(setSearch(SearchS));
    console.log("Search updated to: " + SearchS)
    }


  return (
    <>
    <form className="SearchBar" onSubmit={HandleSubmit}>
        <input type="text" value={SearchS} onChange={(e) => setSearchS(e.target.value)} placeholder="Your Search"></input>
        <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: 24}}/></button>
    </form>
    </>
  );
}

export default SearchBar;