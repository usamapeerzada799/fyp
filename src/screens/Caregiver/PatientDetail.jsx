import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from '../Doctor/Globel';
import { useEffect, useState } from 'react';
import PatientSignUp from './PatientSignUp';
import Signup from '../Signup';
const PatientDetail = () => {
  const[patinetData,setPatienData]=useState({})
    const navigate = useNavigate();
    const location = useLocation();
    const data=location.state;
    
    
    useEffect(()=>{
      const fetchData=async()=>{
       
      const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetPatientId?cid=${data.uid}`);
      const data1=await responce.json();
      console.log(data1);
      if(!data1)
        navigate('/Signup',{state:{Uid:data.uid}})
      setPatienData(data1)
      }
      fetchData();
    },[])
   
  return (
    <> {patinetData &&
        <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card mt-5 d-flex justify-content-center align-items-center">
            <img className="img-fluid rounded-circle mt-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} src={GlobalVariables.apiUrl + patinetData.profPicPath} alt="" />
            <div className="card-body">
                <h5 className="card-title">Name     :{patinetData.name}</h5>
                <h5 className="card-title">Username :{patinetData.userName}</h5>
                <h5 className="card-title">Password :{patinetData.password}</h5>
                
                <h5 className="card-text">Stage  : {patinetData.stage}</h5>
            </div>
            </div>
        </div>
        </div>
        }
        {/* {!patinetData &&
        <Signup/>
        } */}
    </>
  )
}
export default PatientDetail