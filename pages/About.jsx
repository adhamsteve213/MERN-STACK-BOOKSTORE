import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  
  Box,
} from '@mui/material';

function About() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        About Our Bookstore
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2020, our bookstore has been a haven for book lovers in the community.
                We believe that books have the power to transform lives, spark imagination, and
                foster understanding. Our carefully curated collection spans genres from classic
                literature to contemporary fiction, non-fiction, and everything in between.
              </Typography>
              <Typography variant="body1" paragraph>
                We're more than just a bookstore – we're a gathering place for readers, writers,
                and thinkers. Join us in celebrating the joy of reading and the magic of stories.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom align="center">
                What We Offer
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h6">Curated Selection</Typography>
                    <Typography variant="body2">
                      Handpicked books from independent publishers and bestselling authors.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h6">Community Events</Typography>
                    <Typography variant="body2">
                      Author readings, book clubs, and literary discussions.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h6">Online Ordering</Typography>
                    <Typography variant="body2">
                      Convenient online shopping with fast, reliable delivery.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
