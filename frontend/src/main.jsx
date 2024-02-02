import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import connexion from "./services/connexion";
import AuthProvider from "./contexts/Auth";

import App from "./App";
import Home from "./pages/Home/Home";
import AllPkmns from "./pages/AllPkmns/AllPkmns";
import AllTypes from "./pages/AllTypes/AllTypes";
import PkmnPage from "./pages/PkmnPage/PkmnPage";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import Submit from "./pages/Submit/Submit";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Administration/Login";
import SignUp from "./pages/Administration/SignUp";
import Administration from "./pages/Administration/Administration";
import Dashboard from "./pages/Administration/Dashboard";
import Management from "./pages/Administration/Management";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: ({ request }) => {
          const query = new URL(request.url).search;

          return connexion
            .get(`/pokemons${query}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
        },
      },
      {
        path: "/pokemons",
        element: <AllPkmns />,
        loader: ({ request }) => {
          const query = new URL(request.url).search;

          return connexion
            .get(`/pokemons${query}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
        },
      },
      {
        path: "/pokemons/:pokemonId",
        element: <PkmnPage />,
        loader: ({ params }) => {
          return connexion
            .get(`/pokemons/${params.pokemonId}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
        },
      },

      {
        path: "/types",
        element: <AllTypes />,
        loader: ({ request }) => {
          const query = new URL(request.url).search;

          return connexion
            .get(`/types${query}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
        },
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/submit",
        element: <Submit />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/administration/",
    element: <Administration />,
    children: [
      {
        path: "/administration/",
        element: <Dashboard />,
      },
      {
        path: "management",
        element: <Management />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
