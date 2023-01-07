import classes from "./Header.module.css";
import { memo } from "react";

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className={classes.header}>
      <div className={classes.logo}>Gallery</div>
      <button className={classes.button} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default memo(Header);
