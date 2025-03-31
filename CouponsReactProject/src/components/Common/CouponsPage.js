import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

// CouponCard component
const CouponCard = ({ coupon, handleBuy }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={coupon.image || "https://placehold.co/400"}
        alt={coupon.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {coupon.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {coupon.description}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Category: <strong>{coupon.category}</strong>
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Start Date: <strong>{coupon.startDate}</strong>
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          End Date: <strong>{coupon.endDate}</strong>
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
          Price: ${coupon.price.toFixed(2)}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Amount Remaining: <strong>{coupon.amount}</strong>
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleBuy(coupon.id)}>
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

// CouponList component, used to display a list of coupons
const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/coupons");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleBuy = async (couponId) => {
    try {
      const userRole = localStorage.getItem("role");
      const userEmail = localStorage.getItem("email");

      if (userRole !== "CUSTOMER") {
        navigate("/login");
      } else if (!userEmail) {
        alert("Unable to retrieve user email. Please log in again.");
        navigate("/login");
      } else {
        await api.post(`http://localhost:8080/customer/purchase`, null, {
          params: {
            email: userEmail,
            couponId,
          },
        });
        alert("Coupon purchased successfully!");
      }
    } catch (error) {
      console.error("Error handling buy action:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {coupons.map((coupon) => (
        <Grid item key={coupon.id}>
          <CouponCard coupon={coupon} handleBuy={handleBuy} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CouponList;
