import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLayout from './layouts/UserLayout';

import CustomerLogin from './pages/CustomerLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login/customer" element={<CustomerLogin />} />
      </Routes>
    </Router>
  );
}

export default App; 