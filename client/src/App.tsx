import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import HumanResources from "./dashboards/HumanResources/HumanResources";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const parseRes = await response.json();
      console.log("rol", parseRes.user.role);

      localStorage.setItem("token", parseRes.token);
      console.log(parseRes.user.role);

      setAuth(true);
    } catch (err) {
      console.error((err as Error).message);
    }
  }
  return (
    <Fragment>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} setRole={setUserRole} />
            ) : // Kullanıcı rolüne göre yönlendirme yap
            userRole === "leader" ? (
              <Navigate to="/leader" />
            ) : userRole === "employee" ? (
              <Navigate to="/dashboard" />
            ) : userRole === "admin" ? (
              <Navigate to="/human-resources" />
            ) : (
              <Navigate to="/default" />
            )
          }
        />

        <Route
          path={"/dashboard"}
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path={"/human-resources"}
          element={
            isAuthenticated ? (
              <HumanResources setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
