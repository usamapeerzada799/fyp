import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import PatientDetails from '../../images/PatientDetails.jpg'
import People from '../../images/People.jpg'
import NextVisit from '../../images/NextVisit.png'

import ClinicalDetails from '../../images/ClinicalDetails-removebg-preview.jpg'
import Activity from '../../images/Activity.jpg'
import {useLocation,useNavigate} from 'react-router-dom'

const DoctorDashBoard = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const[reciveDataCheck,setReciveDataCheck]=useState({})
  useEffect(()=>{
    const recivedata=location.state;
    console.log(recivedata.uid)
    setReciveDataCheck(recivedata)
  },[])
  return (
    <div>
    <Container className='mt-5 text-center'> {/* Added text-center class to center the content */}
    <span className='d-block fs-1'>Wellcome back</span>
    <span className='d-block fs-1'>{reciveDataCheck.name}</span>
    <Row className="justify-content-center mt-5"> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button onClick={()=>navigate('/ShowAllPatients',{state:reciveDataCheck})} style={{ backgroundColor: '#DBBDE7', width: '160px',height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Patients</span>
            <img src={People} alt="Image 1" className="img-fluid" style={{ borderRadius: '10px',width: '130px',height:'100px' }} />
          </div>
        </button>
      </Col>
      <Col xs={6} md={3}>
        <button onClick={()=>navigate('/Appointment',{state:reciveDataCheck})}  style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Today Appointments</span>
            <img src={PatientDetails} alt="Image 2" className="img-fluid" style={{ borderRadius: '10px', width: '130px',height:'100px' }}/>
          </div>
        </button>
      </Col>
    </Row>
    <Row className="justify-content-center mt-5"> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button style={{ backgroundColor: '#DBBDE7', width: '160px',height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>New Patient Request</span>
            <img src={NextVisit} alt="Image 1" className="img-fluid" style={{ borderRadius: '10px',width: '130px',height:'100px' }} />
          </div>
        </button>
      </Col>
      </Row>
  </Container>
     <div className="text-white text-center fs-1" style={{borderTopRightRadius:'90%' ,height:120,width:'100%',backgroundColor:"#AB91D9", position: 'fixed', bottom: 0, left: 0}}>
     
    </div>
  </div>
  )
}
export default DoctorDashBoard