import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import OrderFilling from './pages/OrderFilling';
import OrderList from './pages/OrderList';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/orderFilling" element={<OrderFilling />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  </React.StrictMode>
);

reportWebVitals();
