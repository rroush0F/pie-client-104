import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import Pies from "./components/Pies/Pies";

function App() {
  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  const updateLocalStorage = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  };

//! Logout
  const clearLocalStorage = () => {
    localStorage.clear();
    setSessionToken(undefined);
  }

    const viewConductor = () => {
      return sessionToken !== undefined ? <Pies sessionToken={sessionToken} /> : <Auth updateLocalStorage={updateLocalStorage} />;
    }
  return (
    <div className="App">
      <Navbar clearLocalStorage={clearLocalStorage} />
      {viewConductor()}
    </div>
  );
}

export default App;