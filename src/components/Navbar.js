import React from "react";
import { Link,  useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = ()=>{
    localStorage.removeItem("auth-token");
    navigate("/login");
  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">myNotebook</a>
    <div>
 
      {!localStorage.getItem("auth-token")?   <form className="d-flex l-btn" role="search">
      <Link to="login" className="nav-link">  <button className="btn" type="submit" style={{fontSize:"1.3rem"}} >Login</button>  </Link>
      <Link to="signup" className="nav-link">  <button className="btn" type="submit" style={{fontSize:"1.3rem"}} >Sign up</button> </Link>
      </form>: <form className="d-flex" role="search"> <Link to="login" className="nav-link">  <button className="btn l-btn" type="submit" onClick={Logout} style={{fontSize:"1.3rem"}} >Log Out</button>  </Link></form>}
    </div>
  </div>
</nav>
    </div>
  );
};

export default Navbar;
