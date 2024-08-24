import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../action/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/Product";
import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";

const categories = [
  "Tshirts",
  "Casual Shirts",
  "Headphones",
  "Mobile Phones",
  "Jackets",
  "Sweaters",
  "Hoodies",
  "Sweatshirts",
  "Shorts",
  "Joggers",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const alert = useAlert();
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {keyword && (
            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                size="small"
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                sx={{
                  color: "#b38b53",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#b38b53",
                    border: "2px solid #fff",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#b38b53",
                  },
                }}
              />
              <br />
              <br />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <br />
              <br />
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  marks
                  size="small"
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  sx={{
                    color: "#b38b53",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#b38b53",
                      border: "2px solid #fff",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#b38b53",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "gold",
                    },
                  }}
                />
              </fieldset>
            </div>
          )}
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                count={Math.ceil(productsCount / resultPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPageNo(value)}
                color="primary"
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
                siblingCount={1}
                boundaryCount={1}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
