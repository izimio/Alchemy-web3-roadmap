import React, { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

export default function Redirect() {
  const navigate = useLocation();

  useEffect(() => {
    window.location.href = "/block/last";
  }, [navigate.pathname]);

  return <div className="App">Redirecting...</div>;
}
