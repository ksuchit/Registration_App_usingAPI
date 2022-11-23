import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loader() {
  return (
    <>
      <Box sx={{ width: "100%" }} >
        <LinearProgress />
      </Box>
          <img src="https://c8.alamy.com/comp/2H09FTH/fast-speed-loading-bar-doodle-with-rocket-speed-progress-bar-fast-internet-concept-hand-drawn-line-sketch-style-isolated-vector-illustration-2H09FTH.jpg"
              alt="loading" 
              style={{width:'100%'}}
          />
          
    </>
  );
}
