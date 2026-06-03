import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RoomInventory from './pages/RoomInventory';
import BookingWorkspace from './pages/BookingWorkspace';
import DepositPayment from './pages/DepositPayment';
import ContractCreation from './pages/ContractCreation';
import RoomHandover from './pages/RoomHandover';
import CheckoutRequest from './pages/CheckoutRequest';
import CheckoutInspection from './pages/CheckoutInspection';
import FinancialSettlement from './pages/FinancialSettlement';
import InvoiceGenerator from './pages/InvoiceGenerator';
import PolicyManagement from './pages/PolicyManagement';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          duration: 4000,
          style: { fontFamily: 'Inter, sans-serif', fontSize: '14px' },
          success: { iconTheme: { primary: '#198754', secondary: '#fff' } },
          error: { iconTheme: { primary: '#DC3545', secondary: '#fff' } },
        }} />
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rooms" element={<RoomInventory />} />
            <Route path="/booking" element={<BookingWorkspace />} />
            <Route path="/deposits" element={<DepositPayment />} />
            <Route path="/contracts" element={<ContractCreation />} />
            <Route path="/handover" element={<RoomHandover />} />
            <Route path="/checkout" element={<CheckoutRequest />} />
            <Route path="/checkout/inspect" element={<CheckoutInspection />} />
            <Route path="/settlement" element={<FinancialSettlement />} />
            <Route path="/invoices/new" element={<InvoiceGenerator />} />
            <Route path="/policies" element={<PolicyManagement />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
