import "../App.css";
function NavBar() {

  return (
    <>
      <header>
        <>
            <img src="./Images/header.jpg" style={{width: "50%", maxHeight: 500}} />
            <div className="FullLogo">
            <img src="./Images/Logo.png" style={{height: 176, marginBottom: 0}} />
            <h1 style={{fontSize: 48, marginBottom: 0, color: "#876445"}}>My Store</h1>
            <h1 style={{height: 28, color: "#CA965C"}}>All you need, in one place </h1>
            </div>
        </>
      </header>
    </>
  );
}

export default NavBar;