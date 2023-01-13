import classes from "./MainNavigation.module.css";

import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <a href="http://localhost:3000/login">Login</a>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <a href="http://localhost:3000/">Home</a>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
