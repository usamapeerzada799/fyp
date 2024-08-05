import React from 'react';
import ReactDOM from 'react-dom/client'
import PatientDetail from './screens/Caregiver/PatientDetail.jsx';
import Login from './screens/Login.jsx'
import Activities from './screens/Caregiver/Activities.jsx';
import Appointment from'./screens/Doctor/Appointment.jsx';
import AppointmentDetails from'./screens/Doctor/AppointmentDetails.jsx'; 
import AddNewAppointment from'./screens/Doctor/AddNewAppointment.jsx';
import PatientPersonPractice from './screens/Patient/PatientPersonPractice.jsx';
import NewPatientRequest from './screens/Doctor/NewPatientRequest.jsx';
import TestDetail from'./screens/Doctor/TestDetail.jsx';
import Test from'./screens/Doctor/Test.jsx';
import DoctorDashBoard from './screens/Doctor/DoctorDashBoard.jsx';
import CameraComponent from './screens/CameraComponent.jsx';
import CreateTest from'./screens/Doctor/CreateTest.jsx';
import CaregiverMain from'./screens/Caregiver/CaregiverMain.jsx';
import ClinicalDetails from './screens/Caregiver/ClinicalDetails.jsx';
import Signup from'./screens/Signup.jsx';
import NextVisit from'./screens/Caregiver/NextVisit.jsx';
import AddTowpersonSentences from './screens/Caregiver/AddTowpersonSentences.jsx';
import SideBar from'./screens/SideBar.jsx';
import ShowAllPatients from'./screens/Doctor/ShowAllPatients.jsx';
import AllAppointsments from'./screens/Doctor/AllAppointsments.jsx';
import PatientMain from'./screens/Patient/PatientMain.jsx';
import PatientPractice from'./screens/Patient/PatientPractice.jsx';
import PatientTest from'./screens/Patient/PatientTest.jsx';
import VoiceAccess from './screens/VoiceAccess.jsx';
import AddPersonPratice from './screens/Caregiver/AddPersonPratice.jsx';
import TwoPersonTest from './screens/Patient/TwoPersonTest.jsx';
import AddPersonTest from './screens/Caregiver/AddPersonTest.jsx';
import DoctorList from './screens/Caregiver/DoctorList.jsx'
import PersonTest from './screens/Caregiver/PersonTest.jsx';
import PatientPersonTest from './screens/Patient/PatientPersonTest.jsx';
import AddTwoPersonTest from './screens/Caregiver/AddTwoPersonTest.jsx';
import AddNewCollection from './screens/AddNewCollection.jsx';
import TwopersonIdentification from './screens/Patient/TwopersonIdentification.jsx';
import Chart from './chart/Chart.jsx'
import { useDataContext,DataContextProvider } from './screens/DataContext.jsx';
import Store from './screens/Store.js';
import './index.css'
import ForLerningDesign from './screens/ForLerningDesign.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,Outlet
} from "react-router-dom";
import Practice from './screens/Doctor/Practice.jsx'

import AddPerson from './screens/Caregiver/AddPerson.jsx';
import AddPractic from './screens/Doctor/AddPractic.jsx';
import Experiment from './screens/Exparimet.jsx';
import {Provider} from 'react-redux'
import PersonPractice from './screens/Caregiver/PersonPractice.jsx';
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
     {
      path:'/Login',
      element:<Login/>
    },
    {
      path:'/PatientTest',
      element:<PatientTest/>
    },
    {
      path:'/PersonPractice',
      element:<PersonPractice/>
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
    path:'/AddNewCollection',
    element:<AddNewCollection/>
  },
  {
    path:'/ForLerningDesign',
    element:<ForLerningDesign/>
  },
  {
    path:'/AddTowpersonSentences',
    element:<AddTowpersonSentences/>
  },
  {
    path:'/TwoPersonTest',
    element:<TwoPersonTest/>
  },
  {
    path:'/AddTwoPersonTest',
    element:<AddTwoPersonTest/>
  },
   {
     path:'/Practice',
     element:<Practice/>
   },
   {
    path:'/TwopersonIdentification',
    element:<TwopersonIdentification/>
  },
   {
    path:'/NewPatientRequest',
    element:<NewPatientRequest/>
  },
   {
    path:'/DoctorList',
    element:<DoctorList/>
  },
   {
    path:'/CameraComponent',
    element:<CameraComponent/>
  },
  {
    path:'/Chart',
    element:<Chart/>
  },
  {
    path:'/PatientPersonTest',
    element:<PatientPersonTest/>
  },
  {
    path:'/PatientPersonPractice',
    element:<PatientPersonPractice/>
  },
  {
    path:'/DoctorDashBoard',
    element:<DoctorDashBoard/>
  },
   {
    path:'/AddPersonPratice',
    element:<AddPersonPratice/>
  },
  {
    path:'/AddPersonTest',
    element:<AddPersonTest/>
  },
   {
    path:'/VoiceAccess',
    element:<VoiceAccess/>
  },
  {
    path:'/PersonTest',
    element:<PersonTest/>
  },
   {
    path:'/Activities',
    element:<Activities/>
  },
  {
    path:'/AddPerson',
    element:<AddPerson/>
  },
   {
    path:'/PatientDetail',
    element:<PatientDetail/>
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
