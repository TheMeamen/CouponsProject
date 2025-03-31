import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// CompanyCouponsPage component, used by companies to manage their coupons
const CompanyCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    startDate: "",
    endDate: "",
    image: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const categories = ["Food", "Fashion", "Cinema", "Spa", "Tech", "Sport"];
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await api.get(`/company/coupons`, {
          params: { email }, // Use the email from localStorage
        });
        setCoupons(response.data);
      } catch (error) {
        setError("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, [email]);

  const handleEditClick = (coupon) => {
    setSelectedCoupon(coupon);
    setFormData({ ...coupon });
    setOpenDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result }); // Convert image to base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await api.put(`/company/coupon`, formData, {
        params: { email }, // Send email as a query parameter
      });
      const updatedCoupons = coupons.map((c) =>
        c.id === selectedCoupon.id ? { ...formData, id: c.id } : c
      );
      setCoupons(updatedCoupons);
      setOpenDialog(false);
    } catch (error) {
      setError("Failed to update coupon. Please try again.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Manage Your Coupons
      </Typography>
      {coupons.length === 0 ? (
        <Typography>No coupons found.</Typography>
      ) : (
        coupons.map((coupon) => (
          <Card key={coupon.id} sx={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h5">{coupon.title}</Typography>
              <Typography>Description: {coupon.description}</Typography>
              <Typography>Price: ${coupon.price}</Typography>
              <Typography>Category: {coupon.category}</Typography>
              <Typography>
                Start Date: {new Date(coupon.startDate).toLocaleDateString()}
              </Typography>
              <Typography>
                End Date: {new Date(coupon.endDate).toLocaleDateString()}
              </Typography>
              {coupon.image && (
                <img
                  src={coupon.image}
                  alt={coupon.title}
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "10px" }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleEditClick(coupon)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Coupon</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            margin="normal"
            value={formData.price}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Current Image:
            </Typography>
            {formData.image && (
              <img
                src={formData.image}
                alt="Coupon"
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginBottom: "10px" }}
              />
            )}
            <Button variant="contained" component="label">
              Upload New Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyCouponsPage;
