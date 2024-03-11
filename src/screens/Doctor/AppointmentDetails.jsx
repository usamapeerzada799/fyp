import { useEffect, useState } from 'react'
import header from '../../images/header.png'
import GlobalVariables from './Globel'
import {useLocation,useNavigate} from 'react-router-dom'
import ProgressBar  from '../ProgressBar'
const AppointmentDetails = () => {
  const [patientAppData,setParientAppData]=useState({})
  const [alphabets,setAlphabets]=useState([]);
  const [words ,setWords]=useState([])
  const [sentences,setSentences]=useState([]);
  const [allAppointDates,setAllAppoointDates]=useState([])
  const [testData,setTestData]=useState([]);
  const [progress,setProgress]=useState(0);
  const navigate = useNavigate();
    const location = useLocation();
  useEffect(()=>{
    const receivedData = location.state;
    //console.log(receivedData)
    setParientAppData(receivedData)
    FeactData(receivedData.id,receivedData.pid)
    AllAppointmentDates(receivedData.pid)
   
  },[])
  const AllAppointmentDates=async(pId)=>{
    const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetAllAppointmentsDates?pid=${pId}`);
    const data=await responce.json();
    console.log(data);
    setAllAppoointDates(data)
  }
  const FeactData=async(appointId,pId)=>{
    const responce = await fetch(GlobalVariables.apiUrl+`/api/User/showSpacificAppointmentData?Appointmentid=${appointId}&pid=${pId}`);
    const data=await responce.json();
    console.log(data);
    setTestData(data.TestData);

    if(data.TestData.length > 0 ){
      const totElement= data.TestData.length;
      const trueCount=data.TestData.filter(value=>value.feedback===true).length;
     console.log(trueCount)  
     const proges =((trueCount / totElement) * 100).toFixed(2);
     console.log(proges)
     setProgress(proges)
    }

     const alpha=data.PracticeData.filter(item=> item.type==='a')
    setAlphabets(alpha);
    
    const word=data.PracticeData.filter(item=> item.type==='w')
    setWords(word);
    const senten=data.PracticeData.filter(item=> item.type==='s')
    setSentences(senten);
  }
  return (
    <div className="container align-items-center justify-content-center ">
       <div className="container text-center" style={{width: "70%",height:'50%'}}>
          <span className='d-block p-2  fs-1 mt-3 text-blue fw-bold'>Details</span>
          <div className="border p-3 fs-3" style={{backgroundColor:'#FCCB9F'}}>
          <span className="d-block p-2 ">{patientAppData.name}</span>
          <span className="d-block p-2 ">Age {patientAppData.age}</span>
          </div>
        </div>
        <div className="input-group mb-3 mt-3 text-center">
        <select className="form-select" value={"select"} onChange={()=>{}}>
       
          {allAppointDates.map((e)=>{
            const onlydate =new Date(e.appointmentDate).toDateString();
            return(
            <option key={e.id} value={e.id}>{onlydate}</option>
          )})} 
        </select>
      </div>
    
    <div className=''>
    {alphabets.length > 0 &&  
      <div className='d-block p-3 mb-2 bg-danger-subtle text-black'>Albhabet
        <div>
        {alphabets.map((e)=>{return (<div className='d-inline'>{e.eText}</div>)})}
        </div> </div>}
      {words.length >0 &&
      <div className='d-block p-3 mb-2 bg-secondary-subtle  text-black'>words
      <div> 
      {words.map((e,index)=>{return (<div key={index} className='d-inline p-2 '>{e.eText}</div>)})}
      
      </div></div>}
      {sentences.length >0 &&
      <div className='d-block p-3 mb-2 bg-secondary-subtle  text-black'>sentences
        <div>
        {sentences.map((e,index)=>{return (<div key={index} className='d-inline p-2 '>{e.eText}</div>)})}
        </div>
      </div>}
    </div>
    <div><span>Progress</span></div>
    <div className="progress" style={{height:30}} >
      <div className="progress-bar" role="progressbar" aria-valuenow="70"
      aria-valuemin="0" aria-valuemax="100" style={{width:progress+'%',backgroundColor:'#ab91d9'}}>
        <span class="sr-only fs-5">{progress}%</span>
      </div>
    </div>
    <div className="row justify-content-center">
        <div className="col-auto mb-3 mt-3">
          <button className="btn btn-primary btn-lg" onClick={()=>{navigate('/AddNewAppointment',{state:patientAppData.id})}}>Add New Appointment</button>
        </div>
      </div>
      <div className="row justify-content-end">
        <div className="col-auto">
          <button className="btn btn-success" onClick={()=>navigate('/TestDetail',{state:testData})}>Test Detail</button>
        </div>
      </div>
    </div>
  )
}
export default AppointmentDetails