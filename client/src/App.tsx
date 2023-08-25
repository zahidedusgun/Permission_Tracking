import React, { Fragment, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { Link } from "react-router-dom";
import HumanResources from "./dashboards/HumanResources/HumanResources";
import Leader from "./dashboards/Leader";
import Employee from "./dashboards/Employee";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <div className="button-container">
              <div className="center-buttons">
                <Link to="/human-resources" className="btn btn-primary">
                  İnsan Kaynakları
                </Link>
                <Link to="/team-leader" className="btn btn-success">
                  Ekip Lideri
                </Link>
                <Link to="/employee" className="btn btn-info">
                  Çalışan Girişleri
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/human-resources" element={<HumanResources />} />
        <Route path="/team-leader" element={<Leader />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </Fragment>
  );
}

export default App;
