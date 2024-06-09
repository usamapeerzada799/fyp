import { useEffect, useState } from 'react'
import header from '../../images/header.png'
import GlobalVariables from './Globel'
import {useLocation,useNavigate} from 'react-router-dom'
import ProgressBar  from '../ProgressBar'
import Chart from '../../chart/Chart.jsx'
// import Chart from '../Chart'
const AppointmentDetails = () => {
  const [patientAppData,setParientAppData]=useState({})
  const [alphabets,setAlphabets]=useState([]);
  const [words ,setWords]=useState([])
  const [sentences,setSentences]=useState([]);
  const [allAppointDates,setAllAppoointDates]=useState([])
  const [testData,setTestData]=useState([]);
  const [ChartData,setChartData]=useState([]);
  const [progress,setProgress]=useState(0);
  const [AddAppointScreenData,setAddAppointScreenData]=useState();
  const [date,setDate]=useState();
  const [recvData,setRecvData]=useState({userId:0})
  const navigate = useNavigate();
    const location = useLocation();
  useEffect(()=>{
    let receivedData = location.state;
    console.log("Recive Data",receivedData)
    setRecvData(receivedData)
    setParientAppData(receivedData)
    if(receivedData.userId  && receivedData.nextAppointDate){
      setAddAppointScreenData({nextAppointDate:receivedData.nextAppointDate,patientId:receivedData.patientId,userId:receivedData.userId})
    }
    if(receivedData.userId  && receivedData.appointmentDate){
     
     FeactData(receivedData.id,receivedData.patientId)
    }
    else if(receivedData.userId  && receivedData.nextAppointDate){
      FeactData(receivedData.id,receivedData.patientId)
    }
    fetchDataForChart(receivedData.patientId)
    let uid;
    if(receivedData.Caregiver){
      uid=0
    }
    else{
      uid=receivedData.userId
    }
    AllAppointmentDates(receivedData.patientId,uid)
  
  },[location.state])
  useEffect(()=>{console.log("abbbbbbbbbbbb",recvData)},[recvData])
  const AllAppointmentDates=async(pId,uid)=>{
    const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetAllAppointmentsDates?pid=${pId}&uid=${uid}`);
    const data=await responce.json();
    if(data!=null)
    {
      console.log("abc");
       FeactData(data[0].id,pId)
    }
    console.log(data);
    setAllAppoointDates(data)
  }
  const fetchDataForChart=async(pid)=>{
    const responce=await fetch(GlobalVariables.apiUrl+`/api/User/GetAllTestResults?pid=${pid}`)
    const dataa=await responce.json()
    if(dataa!=null){
      setChartData(dataa)
      console.log(dataa)
    }
  }
  const FeactData=async(appointId,pId)=>{
    const responce = await fetch(GlobalVariables.apiUrl+`/api/User/showSpacificAppointmentData?Appointmentid=${appointId}&pid=${pId}`);
    const data=await responce.json();
    console.log(data);
    setTestData(data.TestData);

    if(data?.TestData?.length > 0 ){
     const totElement= data.TestData.length;
     const trueCount=data.TestData.filter(value=>value.feedback===true).length;
     console.log(trueCount)  
     const proges =((trueCount / totElement) * 100).toFixed(2);
     console.log(proges)
     setProgress(proges)
    }
    else{
      setProgress(0)
    }
if(data?.PracticeData?.length>0){
     const alpha=data?.PracticeData?.filter(item=> item.type==='a')
    setAlphabets(alpha);
    
    const word=data?.PracticeData?.filter(item=> item.type==='w')
    setWords(word);
    const senten=data?.PracticeData?.filter(item=> item.type==='s')
    setSentences(senten);
}
  }
  return (
    <div className="container align-items-center justify-content-center ">
        {(patientAppData.userId  && patientAppData.nextAppointDate) &&
       <div className="container text-center" style={{width: "70%",height:'50%'}} >
          <span className='d-block p-2  fs-1 mt-3 text-blue fw-bold'>Details</span>
          {recvData.userId &&
          <div className="border p-3 fs-3" style={{backgroundColor: '#DBBDE7', borderRadius: '10px'}}>
          <span className="d-block p-2 ">{patientAppData.name}</span>
          <span className="d-block p-2 ">Age {patientAppData.age}</span>
          </div>}
        </div>
        }
        <div className="input-group mb-4 mt-5 text-center">
          <select className="form-select" value={recvData.id} onChange={(e) => {
            FeactData(e.target.value, patientAppData.patientId);
            setRecvData({ ...recvData, id: e.target.value }); // Update state correctly
          }}>
            
            {allAppointDates.map((e) => {
              const onlydate = new Date(e.appointmentDate).toDateString();
              return (
                <option key={e.id} value={e.id}>{onlydate}</option>
              );
            })}
            
          </select>
        </div>

    
    <div className=''>
    {alphabets?.length > 0 &&  
      <div className='d-block p-3 mb-2 bg-danger-subtle text-black'>Albhabet
        <div>
        {alphabets.map((e,index)=>{return (<div key={index} className='d-inline'>{e.eText}</div>)})}
        </div> </div>}
      {words?.length >0 &&
      <div className='d-block p-3 mb-2 bg-secondary-subtle  text-black'>words
      <div> 
      {words?.map((e,index)=>{return (<div key={index} className='d-inline p-2 '>{e.eText}</div>)})}
      
      </div></div>}
      {sentences?.length >0 &&
      <div className='d-block p-3 mb-2 bg-secondary-subtle  text-black'>sentences
        <div>
        {sentences.map((e,index)=>{return (<div key={index} className='d-inline p-2 '>{e.eText}</div>)})}
        </div>
      </div>}
    </div>
    {testData?.length>0 && <div>
    <div><span>Progress</span></div>
    <div className="progress" style={{height:30}} >
      <div className="progress-bar" role="progressbar" aria-valuenow="70"
      aria-valuemin="0" aria-valuemax="100" style={{width:progress+'%',backgroundColor:'#ab91d9'}}>
        <span className="sr-only fs-5">{progress}%</span>
      </div>
    </div>
    </div>}    
    <Chart data={ChartData} title={"Test Graph"}/>
    {(recvData.userId && recvData.nextAppointDate) &&
    <div className="row justify-content-center">
        <div className="col-auto mb-3 mt-3">
          <button className="btn btn-primary btn-lg text-black" onClick={()=>{navigate('/AddNewAppointment',{state:AddAppointScreenData})}} style={{marginLeft:'0.5rem', backgroundColor: '#DBBDE7', borderRadius: '10px'}}>Add New Appointment</button>
        </div>
      </div>
  }
    {testData?.length>0 &&
      <div className="row justify-content-end mt-3">
        <div className="col-auto">
          <button className="btn btn-success text-black" onClick={()=>navigate('/TestDetail',{state:{testData,recvData}})} style={{marginLeft:'0.5rem', backgroundColor: '#DBBDE7', borderRadius: '10px'}}>Test Detail</button>
        </div>
      </div>
}
    </div>
  )
}
export default AppointmentDetails