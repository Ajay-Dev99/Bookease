import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLayout from './layouts/UserLayout';

import CustomerLogin from './pages/CustomerLogin';
import CustomerSignup from './pages/CustomerSignup';
import ProvidersList from './pages/ProvidersList';
import ProviderServices from './pages/ProviderServices';
import BookingSuccess from './pages/BookingSuccess';
import BookingHistory from './pages/BookingHistory';

// Provider imports
import ProviderLayout from './layouts/ProviderLayout';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import ProviderServicesPage from './pages/provider/ProviderServicesPage';
import ProviderBookings from './pages/provider/ProviderBookings';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/providers" element={<ProvidersList />} />
          <Route path="/providers/:id" element={<ProviderServices />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/my-appointments" element={<BookingHistory />} />
        </Route>

        {/* Provider Routes */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="services" element={<ProviderServicesPage />} />
          <Route path="bookings" element={<ProviderBookings />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
      </Routes>
    </Router>
  );
}

export default App; 