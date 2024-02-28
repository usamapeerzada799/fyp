import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './screens/Doctor/AddPractic.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,Outlet
} from "react-router-dom";
import Practice from './screens/Doctor/Practice.jsx'


import AddPractic from './screens/Doctor/AddPractic.jsx';
const router = createBrowserRouter(
  [  {
   path: "/",
   element: (
     
       <div />
    
   ),
   children: [
     {
       path: "/",
       element: <div />,
     },
     {
       path: "/profile/:id",
       element: <div />,
     },
   ],
 },
   {
     path:'/Practice',
     element:<Practice/>
   },
   {
     path:'/AddPractice',
     element:<AddPractic/>
   },
 ]);
 
 ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
     <RouterProvider router={router} />
   </React.StrictMode>
 );
