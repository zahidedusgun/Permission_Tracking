import React from "react";
import Box from "@mui/material/Box";

function Home() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={2}
        margin={1}
        sx={{
          backgroundColor: "lightblue",
          borderRadius: 4,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>HOME</h2>
      </Box>
    </>
  );
}

export default Home;
