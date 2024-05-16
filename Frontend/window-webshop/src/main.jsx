// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import BrowseWindows from './Pages/BrowseWindows.jsx';

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
        element: <BrowseWindows/>,
      },
      
     
    ],
  },
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);