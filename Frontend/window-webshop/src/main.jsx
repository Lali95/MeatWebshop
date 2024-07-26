import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import BrowseItems from './Pages/BrowseItems';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import ItemDetails from './Pages/ItemDetails';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';

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
        path: 'item/:itemType/:itemId',
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
  <RouterProvider router={router} />
);
