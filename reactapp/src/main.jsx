import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Review from './components/review';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from "./routes/root";
import NewDeck from './components/NewDeck.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "decks/review",
        element: <Review />,
    },
    {
        path: "decks/new",
        element: <NewDeck name="social studies"/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
