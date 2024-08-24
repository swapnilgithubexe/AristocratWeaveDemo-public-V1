import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Aristocrat Weave</h1>
        <p>The brand you deserve!</p>

        <p>Copyrights 2024 &copy; Swapnil Dutta</p>
      </div>

      <div className="rightFooter">
        <h4>Follow us on</h4>
      </div>
    </footer>
  );
};

export default Footer;
