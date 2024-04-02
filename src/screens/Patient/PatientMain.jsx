import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import PatientDetails from '../../images/PatientDetails.jpg'
import People from '../../images/People.jpg'

import ClinicalDetails from '../../images/ClinicalDetails-removebg-preview.jpg'
import Activity from '../../images/Activity.jpg'
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from '../Doctor/Globel';

const PatientMain = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const[reciveDataCheck,setReciveDataCheck]=useState({})
    useEffect(()=>{
      const recivedata=location.state;
      console.log(recivedata.pid)
      setReciveDataCheck(recivedata)
    },[])
  return (
    <div>
    <Container className='mt-5 text-center'> {/* Added text-center class to center the content */}
    <span className='d-block fs-1'>Wellcome back</span>
    <span className='d-block fs-1'>Usama</span>
    <Row className="justify-content-center"> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button  style={{ backgroundColor: '#DBBDE7', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Face Identification</span>
            <img src={PatientDetails} alt="Image 1" className="img-fluid" style={{ borderRadius: '10px' }} />
          </div>
        </button>
      </Col>
      <Col xs={6} md={3}>
        <button onClick={()=>navigate('/PatientTest',{state:reciveDataCheck})} style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Test</span>
            <img src={People} alt="Image 2" className="img-fluid" style={{ borderRadius: '10px' }}/>
          </div>
        </button>
      </Col>
    </Row>
    <Row className='mt-5 justify-content-center'> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button onClick={()=>navigate('/PatientPractice',{state:reciveDataCheck})} style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Practice:</span>
            <img src={ClinicalDetails} alt="Image 3" className="img-fluid" style={{ borderRadius: '10px', height:'120px'}} />
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
export default PatientMain