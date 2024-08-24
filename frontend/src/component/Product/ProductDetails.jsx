import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../action/productAction";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ReviewCard from "./ReviewCard.jsx";
import { addItemsToCart } from "../../action/cartAction.js";

const ProductDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success(
      `${quantity > 1 ? "Items added to cart!" : "Item added to cart!"}`
    );
  };

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  const options = product
    ? {
        size: "small",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      }
    : {};

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`} />
          <div className="ProductDetails">
            <Carousel
              autoPlay={true}
              stopAutoPlayOnHover={true}
              interval={3000}
              animation="fade"
              indicators={false}
            >
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`Slide ${i}`}
                  />
                ))}
            </Carousel>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating
                  {...options}
                  name="custom-color"
                  defaultValue={2}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#b38b53",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "lightgray",
                    },
                  }}
                />
                <br />
                <br />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews}
                  {product.numOfReviews > 1 ? "Reviews" : "Review"})
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.stock < 1}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <span
                    className={
                      product.stock < 1
                        ? "redColor"
                        : product.stock > 0
                        ? "greenColor"
                        : ""
                    }
                  >
                    {product.stock < 1 ? " Out Of stock" : " In stock"}
                  </span>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">Oops, No reviews to show.</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;