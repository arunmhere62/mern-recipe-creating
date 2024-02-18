import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookies("access_token");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/create-recipe'>Create Recipe</Link>
      {!cookies.access_token ? (
        <Link to='/auth'>Auth</Link>
      ) : (
        <>
          <Link to='/saved-recipe'>Saved Recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
};

export default Navbar;
