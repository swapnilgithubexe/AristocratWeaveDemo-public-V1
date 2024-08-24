import React, { Fragment, useEffect } from "react";
import { PiCaretDoubleDownThin } from "react-icons/pi";
import ProductCard from "./Product.jsx";
import MetaData from "../layout/MetaData.jsx";
import { clearErrors, getProducts } from "../../action/productAction.js";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";
import Loader from "../layout/Loader/Loader.jsx";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Aristocrat Weave" />
          <div className="banner">
            <h1>Aristocrat Weave</h1>
            <br />
            <p>
              "Fashions fade, style is eternal." —Yves Saint Laurent
              <br />
              <br />
              Let's find you something!
            </p>
            <br />

            <a href="#container">
              <button aria-label="Scroll down to view products">
                <PiCaretDoubleDownThin />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
