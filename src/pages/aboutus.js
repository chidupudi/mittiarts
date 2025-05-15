import React from "react";
import { Box, Typography, Container, Grid, Paper, Button, Fade } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const About = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #fffaf2, #fff0dc)",
        minHeight: "100vh",
        py: 6,
        fontFamily: "Georgia, serif",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#5b3a1e",
            animation: `${fadeInUp} 1s ease forwards`,
          }}
        >
          About Us
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 5, animation: `${fadeInUp} 1.2s ease forwards` }}
        >
          We’re more than an e-commerce platform — we’re a movement to revive the soul of traditional art and conscious living.
        </Typography>

        {/* OUR ROOTS */}
        <Fade in timeout={1200}>
          <Paper elevation={3} sx={{ p: 5, borderRadius: 4, backgroundColor: "#fff8ef", mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Deep Roots in Sacred Soil
            </Typography>
            <Typography>
              Our story begins with earth – the humble clay from Indian rivers. From this sacred soil, shaped by time and touched by faith. Each piece carries the vibration of tradition, the rhythm of our ancestors, and the pulse of sustainable living.
            </Typography>
          </Paper>
        </Fade>

        <Grid container spacing={5}>
          {/* ARTISAN SPOTLIGHT */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1400}>
              <Paper elevation={4} sx={{ p: 4, backgroundColor: "#fff3e6", borderRadius: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Artisan Spotlight
                </Typography>
                <Typography>
                  Every artisan we work with is a storyteller, a keeper of sacred design. Their fingers trace generations of art into every curve, ensuring no two pieces are ever the same. You’re not just buying a product – you’re preserving a legacy.
                </Typography>
              </Paper>
            </Fade>
          </Grid>

          {/* ENVIRONMENTAL ETHOS */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1600}>
              <Paper elevation={4} sx={{ p: 4, backgroundColor: "#fff3e6", borderRadius: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Environmentally Devoted
                </Typography>
                <Typography>
                  We use natural clay and water-based paints. Our packaging is biodegradable. Our vision is a plastic-free, spiritually aware future where commerce respects the Earth and creators.
                </Typography>
              </Paper>
            </Fade>
          </Grid>

          {/* SOCIAL IMPACT */}
          <Grid item xs={12}>
            <Fade in timeout={1800}>
              <Paper elevation={4} sx={{ p: 4, backgroundColor: "#fff1e6", borderRadius: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Crafting Livelihoods
                </Typography>
                <Typography>
                  Every purchase contributes to the livelihood of rural families. We provide tools, fair wages, and training to the next generation of potters and sculptors, ensuring these ancient skills survive and thrive.
                </Typography>
              </Paper>
            </Fade>
          </Grid>

          {/* CUSTOMER VOICES */}
          <Grid item xs={12}>
            <Fade in timeout={2000}>
              <Paper elevation={4} sx={{ p: 4, backgroundColor: "#fff8ef", borderRadius: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Customer Experiences
                </Typography>
                <Typography sx={{ mb: 2, fontStyle: "italic" }}>
                  “It felt like bringing a piece of temple energy home.” – Priya D.
                </Typography>
                <Typography sx={{ mb: 2, fontStyle: "italic" }}>
                  “The clay pot made my biryani taste just like grandma's. Truly magical!” – Arjun M.
                </Typography>
                <Typography sx={{ fontStyle: "italic" }}>
                  “Beautiful packaging, divine idol, fast delivery. Thank you for this blessing.” – Karthik V.
                </Typography>
              </Paper>
            </Fade>
          </Grid>
        </Grid>

        {/* CTA */}
        <Box textAlign="center" mt={6}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
            Step into the World of Clay, Culture, and Connection
          </Typography>
          <Button
            variant="contained"
            href="/products"
            sx={{
              backgroundColor: "#a0522d",
              "&:hover": { backgroundColor: "#8b4513" },
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 8,
              boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
              mt: 1,
            }}
          >
            View Collections
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
