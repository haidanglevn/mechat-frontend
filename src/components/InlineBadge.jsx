import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InlineNotificationBadge = ({ number }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#FF7B56", // Use theme color or you can specify your own color
        color: "white",
        ml: 1, // margin left for spacing from the preceding text
        fontSize: "0.75rem", // adjust as needed
      }}
    >
      <Typography variant="caption" component="span">
        {number}
      </Typography>
    </Box>
  );
};

export default InlineNotificationBadge;
