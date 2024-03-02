import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './screens/Login.jsx'
import Appointment from './screens/Doctor/Appointment.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,Outlet
} from "react-router-dom";
import Practice from './screens/Doctor/Practice.jsx'


import AddPractic from './screens/Doctor/AddPractic.jsx';
import Experiment from './screens/Exparimet.jsx';

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
   {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/Appointment',
    element:<Appointment/>
  },
  {
    path:'/Experiment',
    element:<Experiment/>
  },
 ]);
 
 ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
     <RouterProvider router={router} />
   </React.StrictMode>
 );
