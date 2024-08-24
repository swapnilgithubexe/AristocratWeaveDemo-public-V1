import React from "react";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";

import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo1.png";

const options = {
  burgerColor: "white",
  burgerColorHover: "#b38b53",
  logo,
  logoWidth: "20vmax",
  navColor1: `wheat`,
  logoHoverSize: "10px",
  logoHoverColor: "#b38b54",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Family: "Encode Sans",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIcon: true,
  SearchIconElement: CiSearch,
  cartIcon: true,
  CartIconElement: PiShoppingCartSimpleThin,
  profileIcon: true,
  ProfileIconElement: PiUserCircleThin,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
