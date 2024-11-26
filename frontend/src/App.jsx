/* eslint-disable react/prop-types */
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./css/App.css";
import AppProvider, { AppContext } from "./context/AppProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import SearchResults from "./pages/SearchResults/SearchResults";
import Wishlist from "./pages/Wishlist/Wishlist";
import Login from "./pages/Login/Login";
import Category from "./pages/Category/Category";
import UserProfile from "./pages/UserProfile/UserProfile";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import UserOrders from "./pages/UserProfile/UserOrders";
import UserProfileInfo from "./pages/UserProfile/UserProfileInfo";
import ShopList from "./pages/ShopList/ShopList";
import PurchaseSuccess from "./pages/PurchaseSuccess/PurchaseSuccess";
import PurchaseCancel from "./pages/PurchaseCancel/PurchaseCancel";
import ShowOrders from "./pages/ShowOrders/ShowOrders";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardProducts from "./pages/DashboardProducts/DashboardProducts";
import DashboardUsers from "./pages/DashboardUsers/DashboardUsers";
import { useContext } from "react";
import DashboardAddUser from "./pages/DashboardAddUser/DashboardAddUser";
import DashboardUpdateUser from "./pages/DashboardUpdateUser/DashboardUpdateUser";
import DashboardAddProduct from "./pages/DashboardAddProduct/DashboardAddProduct";
import DashboardUpdateProduct from "./pages/DashboardUpdateProduct/DashboardUpdateProduct";
import AboutUs from "./components/AboutUs/AboutUs";
import useRefreshToken from "../src/components/RefreshToken/RefreshToken.jsx";
// Role-based redirect
// const RoleBasedRedirect = () => {
//     const { user } = useContext(AppContext);

//     // if user is admin, redirect to dashboard
//     if (user?.role === "admin") {
//         return <Navigate to="/dashboard" replace />;
//     }

//     // For other roles (customer), redirect to home
//     return <Navigate to="/" replace />;
// };

// Protected route for admin pages
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  // if not admin, redirect to home
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  useRefreshToken();
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_SECRET_USER}>
        <AppProvider>
          <Routes>
            {/* 根路径下的角色重定向 */}
            {/* <Route path="/" element={<RoleBasedRedirect />} /> */}

            {/* home page and his children pages */}
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              {/* Weitere Routen hier zwischen */}
              <Route path="search" element={<SearchResults />} />
              <Route path="cart" element={<ShoppingCart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="shop" element={<ShopList />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Login />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="user" element={<UserProfile />}>
                <Route path="orders" element={<UserOrders />} />

                <Route path="data" element={<UserProfileInfo />} />
              </Route>
              <Route path="category/:categoryName" element={<Category />} />
              <Route path="product/:_id" element={<ProductDetails />} />
              <Route path="purchase-success" element={<PurchaseSuccess />} />
              <Route path="purchase-cancel" element={<PurchaseCancel />} />
              <Route path="show-orders" element={<ShowOrders />} />
              {/* Weitere Routen hier zwischen */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* dashboard page */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<DashboardProducts />} />
              <Route path="products/add" element={<DashboardAddProduct />} />
              <Route
                path="products/update/:productId"
                element={<DashboardUpdateProduct />}
              />
              <Route path="users" element={<DashboardUsers />} />
              <Route path="users/add" element={<DashboardAddUser />} />
              <Route
                path="users/update/:userId"
                element={<DashboardUpdateUser />}
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AppProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
