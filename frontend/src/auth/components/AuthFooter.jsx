import React from "react";

import classes from "../css/AuthFooter.module.css";

import playStoreImage from "../../images/play-store.png";
import appleLogoImage from "../../images/apple-logo.png";
import { Link } from "react-router-dom";

const AuthFooter = () => {
  return (
    <div className={classes.container}>
      <div className={classes.icons}>
        <img src={playStoreImage} alt="" />
        <img src={appleLogoImage} alt="" />
      </div>

    </div>
  );
};

export default AuthFooter;
