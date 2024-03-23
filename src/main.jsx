import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './screens/Login.jsx'
import Appointment from './screens/Doctor/Appointment.jsx';
import AppointmentDetails from './screens/Doctor/AppointmentDetails.jsx';
import AddNewAppointment from './screens/Doctor/AddNewAppointment.jsx';
import TestDetail from './screens/Doctor/TestDetail.jsx';
import Test from './screens/Doctor/Test.jsx';
import CreateTest from './screens/Doctor/CreateTest.jsx';
import CaregiverMain from './screens/Caregiver/CaregiverMain.jsx';
import ClinicalDetails from './screens/Caregiver/ClinicalDetails.jsx';
import Signup from './screens/Signup.jsx';
import NextVisit from './screens/Caregiver/NextVisit.jsx';
import './index.css'
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
  {
    path:'/AppointmentDetails',
    element:<AppointmentDetails/>
  },
  {
    path:'/TestDetail',
    element:<TestDetail/>
  },
  {
    path:'/AddNewAppointment',
    element:<AddNewAppointment/>
  },
  {
    path:'/Test',
    element:<Test/>
  },
  {
    path:'/CreateTest',
    element:<CreateTest/>
  },
 
  {
    path:'/CaregiverMain',
    element:<CaregiverMain/>
  },
  {
    path:'/ClinicalDetails',
    element:<ClinicalDetails/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  },
  {
    path:'/NextVisit',
    element:<NextVisit/>
  },
 ]);
 
 ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
     <RouterProvider router={router} />
   </React.StrictMode>
 );
