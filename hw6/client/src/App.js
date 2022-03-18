import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Home';
import Player from './Player';
import './App.css';

function App() {
    return (
      <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/player/:videoID" element={<Player />}></Route>
          </Routes>
      </Router>
    );
}
export default App;