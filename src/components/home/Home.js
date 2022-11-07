import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Home.css";

function Home() {
  const { isFormSubmitted, getIncubation } = useContext(AuthContext);

  useEffect(() => {
    getIncubation();
  }, []);

  if (isFormSubmitted === "YES") {
    return (
      <div className="homeParentDiv">
        <Link className="text-decoration-none" to="/status">
          <div className="home-box box ">
            <h1 className="apply-now">Check Status!</h1>
          </div>
        </Link>
      </div>
    );
  } else if (isFormSubmitted === "NO") {
    return(
      <div className="homeParentDiv">
      <Link className="text-decoration-none" to="/form">
        <div className="home-box box ">
          <h1 className="apply-now">Apply Now!</h1>
        </div>
      </Link>
    </div>
    );
  } else {
    return(
      <div className="home-box box">
      <Box
        sx={{
          display: "flex",
          justifyContent: "Center",
        }}>
        <CircularProgress color="secondary" />
      </Box>
    </div>
    );
  }
}

export default Home;
