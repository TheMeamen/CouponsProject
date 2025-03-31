import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

// MyCoupons component, used to display a list of coupons owned by the customer
const MyCoupons = () => {
    const myCoupons = [
        { name: "Summer Sale", discount: "20%" },
        { name: "Black Friday", discount: "50%" },
    ];

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>My Coupons</Typography>
            <Grid container spacing={2}>
                {myCoupons.map((coupon, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{coupon.name}</Typography>
                                <Typography variant="body1">Discount: {coupon.discount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyCoupons;
