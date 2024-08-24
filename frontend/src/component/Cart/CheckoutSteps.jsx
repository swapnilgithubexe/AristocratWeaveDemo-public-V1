import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: (
        <Typography
          style={{ color: "whitesmoke", font: `300 1vmax "Encode sans" ` }}
        >
          Shipping Details
        </Typography>
      ),
      icon: <LocalShippingIcon />,
    },
    {
      label: (
        <Typography
          style={{ color: "whitesmoke", font: `300 1vmax "Encode sans" ` }}
        >
          Confirm Order
        </Typography>
      ),
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: (
        <Typography
          style={{ color: "whitesmoke", font: `300 1vmax "Encode sans" ` }}
        >
          Payment
        </Typography>
      ),
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "skyblue" : "grey",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
