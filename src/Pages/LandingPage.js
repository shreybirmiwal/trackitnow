import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { AdminNav } from '../Components/AdminNav';

const LandingPage = () => (
  <div>
    <div className="text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to trackitnow.xyz</h1>
      <div>
        <Link to="/whs" className="p-5">Westwood Locker</Link>
        <Link to="/ghs" className="p-5">Georgetown Locker</Link>
        <Link to="/whs/inventory" className="p-5">ADMIN Westwood</Link>
        <Link to="/whs/inventory" className="p-5">ADMIN Georgetown</Link>
      </div>
    </div>
  </div>

);

export default LandingPage;


