import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Success = () => {
  return (
    <div className="orderSuccess">
      <MetaData title="Order Confirmation" />
      <CheckCircleIcon />
      <Typography>Your order has been placed successfully.</Typography>
      <Link to="/orders">My Orders</Link>
    </div>
  );
};

export default Success;
