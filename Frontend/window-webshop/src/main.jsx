// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import BrowseItems from './Pages/BrowseItems.jsx';
import Registration from './Pages/Registration.jsx';
import Login from './Pages/Login.jsx';
import ItemDetails from './Pages/ItemDetails.jsx';
import Cart from './Pages/Cart.jsx';
import Profile from './Pages/Profile.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';  // Ensure correct path and extension

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        index: true,
        element: <div>Welcome to the Landing Page</div>,
      },
      {
        path: 'about',
        element: <AboutUs />,
      },
      {
        path: 'browse',
        element: <BrowseItems />,
      },
      {
        path: 'register',
        element: <Registration />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: ':itemType/:itemId',
        element: <ItemDetails />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
