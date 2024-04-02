import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import PatientDetails from '../../images/PatientDetails.jpg'
import People from '../../images/People.jpg'

import ClinicalDetails from '../../images/ClinicalDetails-removebg-preview.jpg'
import Activity from '../../images/Activity.jpg'
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from '../Doctor/Globel';
const CaregiverMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const[reciveDataCheck,setReciveDataCheck]=useState({})
  useEffect(()=>{
    const recivedata=location.state;
    console.log(recivedata.uid)
    setReciveDataCheck(recivedata)
  },[])
  const patientDetails=async()=>{
    try{
      const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetPatientId?cid=${reciveDataCheck.uid}`);
      const data=await responce.json();
      console.log(data);
      if(data!==null){
        navigate('/AppointmentDetails',{state:data})
      }
    }catch(err){console.log('Error:',err)}
  }
  return (
    <div>
    <Container className='mt-5 text-center'> {/* Added text-center class to center the content */}
    <span className='d-block fs-1'>Wellcome back</span>
    <span className='d-block fs-1'>Usama</span>
    <Row className="justify-content-center"> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button onClick={patientDetails} style={{ backgroundColor: '#DBBDE7', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Patient Details</span>
            <img src={PatientDetails} alt="Image 1" className="img-fluid" style={{ borderRadius: '10px' }} />
          </div>
        </button>
      </Col>
      <Col xs={6} md={3}>
        <button style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>people</span>
            <img src={People} alt="Image 2" className="img-fluid" style={{ borderRadius: '10px' }}/>
          </div>
        </button>
      </Col>
    </Row>
    <Row className='mt-5 justify-content-center'> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button onClick={()=>navigate('/ClinicalDetails',reciveDataCheck)} style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Clinical Details</span>
            <img src={ClinicalDetails} alt="Image 3" className="img-fluid" style={{ borderRadius: '10px', height:'120px'}} />
          </div>
        </button>
      </Col>
      <Col xs={6} md={3} >
        <button style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Activities</span>
            <img src={Activity} alt="Image 4" className="img-fluid" style={{ borderRadius: '10px' }}/>
          </div>
        </button>
      </Col>
    </Row>
  </Container>
     <div className="text-white text-center fs-1" style={{borderTopRightRadius:'90%' ,height:190,width:'100%',backgroundColor:"#AB91D9",}}>
     
    </div>
  </div>
  )
}
export default CaregiverMain