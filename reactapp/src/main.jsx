import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Review from './components/Review.jsx';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './styles/index.css';
import Root from "./routes/root";
import NewDeck from './components/NewDeck/NewDeck.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/review",
        element: <Review />,
    },
    {
        path: "/new",
        element: <NewDeck name="social studies"/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
