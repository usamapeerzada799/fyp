import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import {useLocation,useNavigate} from 'react-router-dom'
import VisitHistory from '../../images/VisitHistory.jpg'
import NextVisit from '../../images/NextVisit.png'
import Practice from '../../images/practice.jpg';
import Test from '../../images/Test.png';
import GlobalVariables from '../Doctor/Globel';

const ClinicalDetails = () => {
  const [patienId,setPatientId]=useState({})
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state;
  console.log(receivedData)
  useEffect(()=>{
    const fetchData=async()=>{
      const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetPattient?cid=${receivedData.uid}`);
      const data=await responce.json();
      console.log(data);
      setPatientId(data)
    }
    fetchData();
  },[])
  const patientDetails=()=>{
    try{
      // const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetPatientAppointDateAndId?cid=${receivedData.uid}`);
      // const data=await responce.json();
      // console.log(data);
      if(patienId){
        navigate('/AppointmentDetails',{state:{patientId:patienId?.patientId,userId:receivedData.uid,Caregiver:1}})
      }
    }catch(err){console.log('Error:',err)}
  }
  return (
    <div>
        <div className="text-white text-center fs-1" style={{borderBottomLeftRadius:'90%' ,height:180,width:'100%',backgroundColor:"#AB91D9",}}>
          <div className=" p-5">Clinical Details</div>
        </div>
    <Container className='mt-1 text-center'> {/* Added text-center class to center the content */}
   
    <Row className="justify-content-center"> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button onClick={patientDetails} style={{ backgroundColor: '#DBBDE7',width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Visit History</span>
            <img src={VisitHistory} alt="Image 1" className="img-fluid" style={{ borderRadius: '10px' }} />
          </div>
        </button>
      </Col>
      <Col xs={6} md={3}>
        <button onClick={()=>navigate('/NextVisit',{state:patienId})} style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Next Visit</span>
            <img src={NextVisit} alt="Image 2" className="img-fluid" style={{ borderRadius: '10px' }}/>
          </div>
        </button>
      </Col>
    </Row>
    <Row className='mt-5 justify-content-center'> {/* Added justify-content-center class to center the rows */}
      <Col xs={6} md={3}>
        <button onClick={()=>navigate('/patientPractice',{state:{pid:patienId?.patientId,uid:receivedData.uid}})} style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Practice</span>
            <img src={Practice} alt="Image 3" className="img-fluid" style={{ borderRadius: '10px', height:'120px'}} />
          </div>
        </button>
      </Col>
      <Col xs={6} md={3} >
        <button onClick={()=>navigate('/patientTest',{state:{pid:patienId?.patientId,uid:receivedData.uid}})} style={{ backgroundColor: '#DBBDE7', width: '160px', height: '150px', borderRadius: '10px', border: 'none', outline: 'none' }}>
          <div className="text-center">
            <span className='d-block'>Test</span>
            <img src={Test} alt="Image 4" className="img-fluid" style={{ borderRadius: '10px',height: "120px"}}/>
          </div>
        </button>
      </Col>
    </Row>
  </Container>
     <div className="text-white text-center fs-1" style={{borderTopRightRadius:'90%' ,height:135,width:'100%',backgroundColor:"#AB91D9",}}>
     
    </div>
  </div>
  )
}
export default ClinicalDetails