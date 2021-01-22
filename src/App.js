import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Header />
        <Body />
        <Footer />
      </Box>
    </Container>
  );
}

export default App;
