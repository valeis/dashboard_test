import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import "./Navbar.css";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login", { replace: true });
  };

  if (authCtx.isLoading) return <>...Loading</>;

  return (
    <div className="wrapper">
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          {!authCtx.isLoading ? (
            <div className="nav-text-bar">
              <AiIcons.AiOutlineUser />
              &nbsp;
              {authCtx.currentUser?.name}
            </div>
          ) : (
            "...Loading"
          )}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {isLoggedIn && (
              <li>
                <div>
                  <button onClick={logoutHandler} className='button_logout'>Logout</button>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default Navbar;
