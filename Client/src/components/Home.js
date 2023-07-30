import "../App.css";
import NavBar from "./NavBar";
import MainHeader from "./MainHeader";
import Products from "./Products";

function Home(props) {

  return (
    <div className="Home">
      <NavBar />
      <MainHeader />
      <Products limit={20}/>
      
    </div>
  );
}

export default Home;
