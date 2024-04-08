import React from 'react';
import ReactDOM from 'react-dom/client'

import Login from './screens/Login.jsx'
import Appointment from'./screens/Doctor/Appointment.jsx';
import AppointmentDetails from'./screens/Doctor/AppointmentDetails.jsx'; 
import AddNewAppointment from'./screens/Doctor/AddNewAppointment.jsx';
import TestDetail from'./screens/Doctor/TestDetail.jsx';
import Test from'./screens/Doctor/Test.jsx';
import CreateTest from'./screens/Doctor/CreateTest.jsx';
import CaregiverMain from'./screens/Caregiver/CaregiverMain.jsx';
import ClinicalDetails from './screens/Caregiver/ClinicalDetails.jsx';
import Signup from'./screens/Signup.jsx';
import NextVisit from'./screens/Caregiver/NextVisit.jsx';
import SideBar from'./screens/SideBar.jsx';
import ShowAllPatients from'./screens/Doctor/ShowAllPatients.jsx';
import AllAppointsments from'./screens/Doctor/AllAppointsments.jsx';
import PatientMain from'./screens/Patient/PatientMain.jsx';
import PatientPractice from'./screens/Patient/PatientPractice.jsx';
import PatientTest from'./screens/Patient/PatientTest.jsx';
import { useDataContext,DataContextProvider } from './screens/DataContext.jsx';
import Store from './screens/Store.js';
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
import {Provider} from 'react-redux'
function Layout() {
 // const { sharedData } = useDataContext();
  return (
    <div style={{ display: 'flex' }}>
    {/* <SideBar sharedData={sharedData} /> */}
    <div style={{ flex: 1 }}>
     
        <Outlet />
     
    </div>
  </div>
  );
}

const router = createBrowserRouter(
  [ 
    {
      path: '/',  // Set the path to '/Login'
      element: <Login/>  // Render the Login component
    },
     {
   
   element: (
    <DataContextProvider>
      <Layout />
    </DataContextProvider>
  ),
   children: [
    {
      path:'/Appointment',
      element:<Appointment/>
    },
     {
       path: "/profile/:id",
       element: <div />,
     },
    //  {
    //   path:'/Login',
    //   element:<Login/>
    // },
    {
      path:'/PatientTest',
      element:<PatientTest/>
    },
    {
      path:'/ShowAllPatients',
      element:<ShowAllPatients/>
    },
    {
      path:'/AllAppointsments',
      element:<AllAppointsments/>
    },
   ],
   
 },
   {
     path:'/Practice',
     element:<Practice/>
   },
   {
    path:'/PatientPractice',
    element:<PatientPractice/>
  },
   {
    path:'/PatientMain',
    element:<PatientMain/>
  },
   {
     path:'/AddPractice',
     element:<AddPractic/>
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
    <Provider store={Store}>
     <RouterProvider router={router} />
     </Provider>
   </React.StrictMode>
 );
