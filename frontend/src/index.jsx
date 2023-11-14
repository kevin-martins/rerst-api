import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Layout from './components/Layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import UserId from './pages/UserId';
import PassId from './pages/PassId';
import Users from './pages/Users';
import Places from './pages/Places';
import PlaceId from './pages/PlaceId';
import UserAvailablePlaces from './pages/UserAvailablePlaces';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/places" element={<Places />} />
      <Route path="/places/:id" element={<PlaceId />} />
      <Route path="/users/:id" element={<UserId />} />
      <Route path="/passes/:id" element={<PassId />} />
      <Route path="/users/:id/places" element={<UserAvailablePlaces />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
