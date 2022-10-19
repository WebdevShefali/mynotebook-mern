
import React from 'react';
import { useState } from "react";
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NoteState from './context/NoteState';
import Alert from './components/Alert';

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
<Routes>
<Route exact path="/" element={<Home showAlert={showAlert}/>}/>
<Route exact path="/login" element={<LogIn showAlert={showAlert}/>}/>
<Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}/>   
</Routes>
     </Router>
    </NoteState>
  
  )
}

export default App

