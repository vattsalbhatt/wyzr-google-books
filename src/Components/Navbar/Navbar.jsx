import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState("Please Login!");
  const [login, setLogin] = useState(null);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    //get local user Data and change login status
    const userData = JSON.parse(localStorage.getItem("loginWyzrUser")) || "";

    if (userData.accessToken) {
      setUser(true);
      //   setUserInfo(userData);
      setUserName(userData.profileObj.givenName);
      setLogin("Logout");
      //   oneLoad();
    } else {
      return;
    }
  };

  const logout = () => {
    localStorage.removeItem("loginWyzrUser");
    localStorage.removeItem("wzrCurUser");
    window.location.reload();
  };
  return (
    <>
      <div className="navbar">
        <div>
          <button className="home">
            <Link to={"/"}>Home</Link>
          </button>
          <button className="search">
            <Link to={"/search"}>Search</Link>
          </button>

          <>
            <p>{userName}</p>
            {user === true ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <p>Welcome</p>
            )}
          </>
        </div>
      </div>
    </>
  );
};
