import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

//Admin Dashboard component, used by admins to manage companies and customers
const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    fetchCompanies();
    fetchCustomers();
  }, []);

  const fetchCompanies = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("http://localhost:8080/admin/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(response.data);
      console.log("Companies:", response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get("http://localhost:8080/admin/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleAddOrUpdateCompany = async () => {
    try {
      if (currentCompany.id) {
        await api.put("http://localhost:8080/admin/company", currentCompany);
      } else {
        await api.post("http://localhost:8080/admin/company", currentCompany);
      }
      fetchCompanies();
      setIsCompanyDialogOpen(false);
    } catch (error) {
      console.error("Error saving company:", error);
    }
  };

  const handleDeleteCompany = async (id) => {
    try {
      await api.delete(`http://localhost:8080/admin/company/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleAddOrUpdateCustomer = async () => {
    try {
      if (currentCustomer.id) {
        await api.put("http://localhost:8080/admin/customer", currentCustomer);
      } else {
        await api.post("http://localhost:8080/admin/customer", currentCustomer);
      }
      fetchCustomers();
      setIsCustomerDialogOpen(false);
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await api.delete(`http://localhost:8080/admin/customer/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Companies Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Companies</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentCompany({ name: "", email: "", password: "" });
            setIsCompanyDialogOpen(true);
          }}
          sx={{ mt: 2 }}
        >
          Add Company
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.id}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setCurrentCompany(company);
                        setIsCompanyDialogOpen(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteCompany(company.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Customers Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Customers</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentCustomer({ username: "", email: "", password: "" });
            setIsCustomerDialogOpen(true);
          }}
          sx={{ mt: 2 }}
        >
          Add Customer
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.username}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setCurrentCustomer(customer);
                        setIsCustomerDialogOpen(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Company Dialog */}
      <Dialog
        open={isCompanyDialogOpen}
        onClose={() => setIsCompanyDialogOpen(false)}
      >
        <DialogTitle>{currentCompany?.id ? "Edit Company" : "Add Company"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={currentCompany?.name || ""}
            onChange={(e) =>
              setCurrentCompany({ ...currentCompany, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={currentCompany?.email || ""}
            onChange={(e) =>
              setCurrentCompany({ ...currentCompany, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={currentCompany?.password || ""}
            onChange={(e) =>
              setCurrentCompany({ ...currentCompany, password: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCompanyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdateCompany} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Customer Dialog */}
      <Dialog
        open={isCustomerDialogOpen}
        onClose={() => setIsCustomerDialogOpen(false)}
      >
        <DialogTitle>
          {currentCustomer?.id ? "Edit Customer" : "Add Customer"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            value={currentCustomer?.username || ""}
            onChange={(e) =>
              setCurrentCustomer({ ...currentCustomer, username: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={currentCustomer?.email || ""}
            onChange={(e) =>
              setCurrentCustomer({ ...currentCustomer, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={currentCustomer?.password || ""}
            onChange={(e) =>
              setCurrentCustomer({ ...currentCustomer, password: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCustomerDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdateCustomer} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
