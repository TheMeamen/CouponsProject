import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// AddCouponPage component, used by companies to add new coupons
const AddCouponPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const categories = ["Food", "Fashion", "Cinema", "Spa", "Tech", "Sport"];

  useEffect(() => {
    // Retrieve email from localStorage on component mount
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setMessage("No email found. Please log in again.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        email, // Use the email retrieved from localStorage
        coupon: formData, // Send the coupon data
      };
      await api.post(`/company/coupon`, requestData);
      setMessage("Coupon added successfully!");
    } catch (error) {
      setMessage(error.response?.data || "Error adding coupon");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Add a New Coupon
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="body1" gutterBottom>
            Company Email: {email || "Not found"}
          </Typography>
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Add Coupon
          </Button>
        </form>
        {message && (
          <Typography color={message.includes("success") ? "primary" : "error"}>
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AddCouponPage;
