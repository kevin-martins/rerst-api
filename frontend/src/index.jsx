import React, { useState } from 'react';
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
import PassId from './pages/PassId';
import Places from './pages/Places';
import PlaceId from './pages/PlaceId';
import UserAvailablePlaces from './pages/UserAvailablePlaces';
import Error404 from './pages/Error404';
import Auth from './components/Auth';
import Profile from './pages/Profile';

const App = () => {
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout setIsLogged={setIsLogged} />}>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser} />} />
        <Route path="/places" element={<Places user={user} />} />
        <Route path="/places/:id" element={<PlaceId user={user} />} />
        <Route path="/passes/:id" element={<PassId />} />
        <Route path="/users/:id/places" element={<UserAvailablePlaces />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    )
  );

  if (!isLogged) {
    return <Auth setIsLogged={setIsLogged} setUser={setUser} />
  }

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
