import { Box, Button, Divider, Stack } from "@mui/material";
import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/Login");
  };
  return (
    <Stack direction="row" justifyContent="center">
      <Button
        onClick={handleLogout}
        variant="contained"
        color="primary"
        sx={{ width: "200px", margin: "50px 0px" }}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default Logout;
