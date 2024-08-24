import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearError, getOrderDetails } from "../../action/orderAction";

const OrderDetails = () => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>

              <div className="orderDetailsGrid">
                <div className="orderDetailsContainerBox">
                  <Typography>Shipping Details:</Typography>
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        order.shippingInfo.address &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                <div className="orderDetailsContainerBox">
                  <Typography>Payment details:</Typography>
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "UNPAID"}
                    </p>
                  </div>
                  <div>
                    <p>Total amount:</p>
                    <span>₹ {order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <div className="orderDetailsContainerBox">
                  <Typography>Order Status:</Typography>
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography
                style={{ marginLeft: "45%", font: "500 1.2vmax Encode sans" }}
              >
                Order Items:
              </Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
