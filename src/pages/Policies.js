import React from "react";
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const policySections = [
  {
    title: "Terms and Conditions",
    points: [
      "By accessing and using our platform, you agree to abide by our policies.",
      "All products listed are handcrafted and subject to slight variations.",
      "Unauthorized use or duplication of product images or content is prohibited.",
      "Orders are processed only after payment confirmation.",
      "We reserve the right to update these terms at any time."
    ]
  },
  {
    title: "Privacy Policy",
    points: [
      "We value your privacy and do not share your personal information without consent.",
      "User data is stored securely and used only to process orders or improve our service.",
      "We use cookies to enhance user experience and analyze website traffic.",
      "You can request deletion of your account and personal data at any time."
    ]
  },
  {
    title: "Shipping, Refund & Return Policy",
    points: [
      "We usually ship within 3-5 working days after order confirmation.",
      "You’ll receive tracking details once your order is dispatched.",
      "Refunds are issued only for damaged or undelivered items.",
      "Returns are accepted within 7 days of delivery in unused condition.",
      "For return or refund requests, please contact our support team with order details."
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
      </Container>
    </Box>
  );
};

export default Policies;