import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CouponsPage from "./components/Common/CouponsPage";
import LandingPage from "./components/Common/LandingPage";
import LoginPage from "./components/Common/Login";
import Navbar from "./components/Common/Navbar";
import Register from "./components/Common/Register";
import Dashboard from "./components/Admin/Dashboard";
import AddCouponPage from "./components/Company/NewCoupon";
import ManageCoupons from "./components/Company/ManageCoupons";
import Profile from "./components/Customer/Profile";
import PurchaseHistory from "./components/Customer/PurchaseHistory";

const App = () => {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coupons" element={<CouponsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/newcoupon" element={<AddCouponPage />} />
        <Route path="/managecoupons" element={<ManageCoupons />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-purchases" element={<PurchaseHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
