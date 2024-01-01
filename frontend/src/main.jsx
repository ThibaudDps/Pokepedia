import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import connexion from "./services/connexion";

import App from "./App";
import Home from "./pages/Home/Home";
import AllPkmns from "./pages/AllPkmns/AllPkmns";
import AllTypes from "./pages/AllTypes/AllTypes";
import PkmnPage from "./pages/PkmnPage/PkmnPage";
import About from "./pages/About/About";
import Submit from "./pages/Submit/Submit";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Administration/Login";
import Administration from "./pages/Administration/Administration";
import Dashboard from "./pages/Administration/Dashboard";
import AdminCard from "./pages/Administration/AdminCard";
import { AuthProvider } from "./contexts/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/submit",
        element: <Submit />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/administration/",
    element: <Administration />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "admincard",
        element: <AdminCard />,
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
