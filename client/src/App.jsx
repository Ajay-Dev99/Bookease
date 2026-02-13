import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLayout from './layouts/UserLayout';

import CustomerLogin from './pages/CustomerLogin';
import CustomerSignup from './pages/CustomerSignup';
import ProvidersList from './pages/ProvidersList';
import ProviderServices from './pages/ProviderServices';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/providers" element={<ProvidersList />} />
          <Route path="/providers/:id" element={<ProviderServices />} />
        </Route>
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
      </Routes>
    </Router>
  );
}

export default App; 