import "./App.css";
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store.js";
// import { useSelector } from "react-redux";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home.jsx"
import ProductDetails from "./component/Product/ProductDetails.jsx"
import Products from "./component/Product/Products.jsx"
import Search from "./component/Product/Search.jsx"
import LoginSignUp from "./component/User/LoginSignUp.jsx"
import { loadUser } from "./action/userAction.js";
// import UserOptions from "./component/layout/Header/UserOptions.jsx"
import Profile from "./component/User/Profile.jsx"
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
import UpdateProfile from "./component/User/UpdateProfile.jsx"
import UpdatePassword from "./component/User/UpdatePassword.jsx"
import ForgotPassword from "./component/User/ForgotPassword.jsx"
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx"
import Shipping from "./component/Cart/Shipping.jsx"
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx"
import Payment from "./component/Payment/Payment.jsx"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./component/Cart/orderSuccess.jsx"
import Loader from "./component/layout/Loader/Loader.jsx";
import MyOrders from "./component/Orders/MyOrders.jsx"
import OrderDetails from "./component/Orders/OrderDetails.jsx"
import Dashboard from "./component/Admin/Dashboard.jsx"


function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripePromise, setStripePromise] = useState(null);
  const [loading, setLoading] = useState(true);


  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripePromise(loadStripe(data.stripeApiKey));
    } catch (error) {
      console.log("Error fetching API KEY")
    } finally {
      setLoading(false);
    }

  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Libre Baskerville", "Droid Sans", "Encode Sans", "Dancinf Script"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  if (loading) {
    return <Loader />
  }
  return (
    <Router>
      <Header />
      {/* {isAuthenticated && <UserOptions user={user} />} */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />


        <Route path="/account" element={<ProtectedRoute element={<Profile />} />} />

        {stripePromise && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={stripePromise}>
                <ProtectedRoute element={<Payment />} />
              </Elements>
            }
          />
        )}
        <Route path="/success" element={<ProtectedRoute element={<Success />} />} />

        <Route path="/orders" element={<ProtectedRoute element={<MyOrders />} />} />

        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />

        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />


        <Route path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />} />

        <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile />} />} />

        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />

        <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />


        <Route path="/Search" element={<Search />} />

      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
