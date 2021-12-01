import React from 'react';
import {
  BrowserRouter as Router, Route, Routes as Switch,
} from 'react-router-dom';
import HomePage from './containers/HomePage';
import Navbar from './containers/Navbar';
import StoryDetails from './containers/StoryDetails';

const Routes = () => (
  <Router>
    <div className="app">
      <nav className="navbar">
        <Navbar />
      </nav>

      <div className="main-container">
        <Switch>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/:id" element={<StoryDetails />} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default Routes;
