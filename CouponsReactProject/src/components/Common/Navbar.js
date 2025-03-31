import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // Get the user role from localStorage
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Define links for different roles
  const navLinks = {
    guest: [
      { label: "Home", path: "/" },
      { label: "Coupons", path: "/coupons" },
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
    ],
    CUSTOMER: [
      { label: "Home", path: "/" },
      { label: "Coupons", path: "/coupons" },
      { label: "Profile", path: "/profile" },
      { label: "My Purchases", path: "/my-purchases" },
      { label: "Logout", action: handleLogout },
    ],
    COMPANY: [
      { label: "Home", path: "/" },
      { label: "Coupons", path: "/coupons" },
      { label: "Manage Coupons", path: "/managecoupons" },
      { label: "Create New Coupon", path: "/newcoupon" },
      { label: "Logout", action: handleLogout },
    ],
    ADMIN: [
      { label: "Home", path: "/" },
      { label: "Coupons", path: "/coupons" },
      { label: "Admin Dashboard", path: "/admin-dashboard" },
      { label: "Logout", action: handleLogout },
    ],
  };

  // Determine the current role or default to guest
  const links = isAuthenticated ? navLinks[role] : navLinks["guest"];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CouponWorld
        </Typography>
        <Box>
          {links.map((link, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={link.action ? link.action : () => navigate(link.path)}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
