import React from "react";
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const policySections = [
  {
    title: "Shipping Policy",
    points: [
      "Orders are prepared fresh and typically delivered within 3-5 days after confirmation, depending on location and order volume.",
      "Delivery hours: Monday–Sunday: 11 am to 11 pm.",
      "Advance scheduling available for large orders or catering.",
      "Standard Delivery Fee: Rs 40; Free for orders over Rs 500.",
      "Catering or special event deliveries may have additional charges based on distance and size."
    ]
  },
  {
    title: "Terms and Conditions",
    points: [
      "You must be at least 18 years old or have guardian supervision to use our services.",
      "All orders are subject to acceptance and availability.",
      "We may refuse or cancel orders due to errors or suspected fraud.",
      "Delivery estimates may vary; customers must provide accurate addresses.",
      "All content is our intellectual property and protected by law.",
      "Customers with allergies must notify staff or include notes during ordering.",
      "Our total liability is limited to the amount paid for the specific order.",
      "These terms are governed under Indian law and may change without notice."
    ]
  },
  {
    title: "Refund and Return Policy",
    points: [
      "Refunds are available for incorrect, missing, or poor-quality items.",
      "Refund requests must be made within 24 hours of receiving the order.",
      "Returns are not accepted due to the perishable nature of product.",
      "No refunds for customer errors or external delivery delays.",
      "To request a refund, provide your order number, issue description, and photos.",
      "Approved refunds may be credited back within 7–10 days to the original method."
    ]
  }
];

const Policies = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #fff9f5, #fff3ea)",
        minHeight: "100vh",
        py: 6,
        fontFamily: "'Georgia', serif",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: "#5c3a1e", mb: 4 }}
        >
          Policies
        </Typography>

        {policySections.map((section, index) => (
          <Paper
            elevation={3}
            key={section.title}
            sx={{
              p: 4,
              mb: 5,
              borderRadius: 4,
              backgroundColor: "#fff",
              animation: `${fadeIn} 0.8s ease ${index * 0.2}s forwards`,
              opacity: 0,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: "#7b4929", fontWeight: 600 }}>
              {section.title}
            </Typography>
            <List>
              {section.points.map((point, idx) => (
                <ListItem key={idx} sx={{ py: 0.5 }}>
                  <ListItemText primary={`• ${point}`} />
                </ListItem>
              ))}
            </List>
            {index !== policySections.length - 1 && <Divider sx={{ mt: 3 }} />}
          </Paper>
        ))}

        <Typography align="center" sx={{ mt: 4, fontSize: 14, color: "#7a4b2c" }}>
          For queries, contact us at +91-7382150250 or mittiarts0@gmail.com
        </Typography>
      </Container>
    </Box>
  );
};

export default Policies;