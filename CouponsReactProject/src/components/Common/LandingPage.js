import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// LandingPage component, a simple welcome page
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Welcome to CouponWorld!
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
            Save more, shop smarter. Discover exclusive deals and discounts
            today!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Box sx={{ mt: 6 }}>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              "Your one-stop platform for the best deals and savings."
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingPage;
