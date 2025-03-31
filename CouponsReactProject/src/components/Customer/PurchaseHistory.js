import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import api from "../../api/axios";

// PurchaseHistory component, used to display a list of purchased coupons by the customer
const PurchaseHistory = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = localStorage.getItem("email"); // Retrieve email from localStorage

  useEffect(() => {
    const fetchPurchasedCoupons = async () => {
      try {
        const response = await api.get("/customer/purchased", {
          params: { email }, // Pass the email as a query parameter
        });
        setCoupons(response.data);
      } catch (err) {
        console.error("Error fetching purchased coupons:", err);
        setError("Failed to fetch purchased coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCoupons();
  }, [email]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (coupons.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5">You haven't purchased any coupons yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Purchase History
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {coupons.map((coupon) => (
          <Grid item key={coupon.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="180"
                image={coupon.image || "https://via.placeholder.com/300"}
                alt={coupon.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {coupon.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {coupon.description}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Category: <strong>{coupon.category}</strong>
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Valid From: <strong>{coupon.startDate}</strong>
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Valid Until: <strong>{coupon.endDate}</strong>
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>
                  Price: ${coupon.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PurchaseHistory;
