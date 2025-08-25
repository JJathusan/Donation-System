// src/App.js
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import About from './pages/About';
import './App.css';

const { BrowserRouter: Router, Routes, Route, Link } = ReactRouterDOM;

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/registration">Registration</Link> |{" "}
          <Link to="/about">About</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
