import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hacker-news1_logo.jpg';

const Navbar = () => (
  <Link to="/">
    <img alt="HackerNews" src={logo} />
  </Link>
);

export default Navbar;
