import React from "react";
import { useState } from "react";
import routes from "./app.routes";
import { RouterProvider } from "react-router";
import { AuthProvider } from "../modules/auth/context/AuthContext.jsx";
import "./App.css";

const App = () => {
  return <AuthProvider><RouterProvider router={routes} /></AuthProvider>;
};

export default App;
