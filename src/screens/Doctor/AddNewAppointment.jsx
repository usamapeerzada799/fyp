import { useEffect, useState } from 'react';
import Datetime, { contextType } from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from './Globel';
import { useSelector } from 'react-redux';
import Practice from './Practice';
import PersonPractice from '../Caregiver/PersonPractice';
const AddNewAppointment = () => {
  const [date,setDate]=useState(new Date())
  const [addAppoinmentData,setAddAppointmentData]=useState({})
  const [reciveDataCheck,setReciveDataCheck]=useState({})
  const[nextAppDate,setNextAppDate]=useState()
  const navigate = useNavigate();
  const location = useLocation();
  let receivedData={}
  let objects = useSelector(state => state);
  useEffect(()=>{
    console.log('Add New Appoint')
    if (location.state){
       receivedData = location.state;
       console.log(receivedData)
       setReciveDataCheck(receivedData)
       
    }
  },[reciveDataCheck])
  useEffect(()=>{},[reciveDataCheck,date])
  const handleDateChange = (selectedDate) => {
    // Convert Moment object to JavaScript Date object
    const jsDate = selectedDate.toDate();

    // Do something with the JavaScript Date object
    console.log(jsDate);
    console.log(selectedDate.format('MM/DD/YYYY HH:mm A'));
    setNextAppDate(selectedDate.format('MM/DD/YYYY HH:mm A'));
    setDate(selectedDate);
    // Set the date state to the selected Moment object
    
  };
  const addAppointment=async()=>{
    try{

      const paractic=objects?.objects1[0]?.AppointmentPractics;
      const personParactic=objects?.objects3[0]?.AppointmentPersonPractics;
      const test=objects?.objects2[0]?.AppointmentTests;
      const personTest=objects?.objects4[0]?.AppointmentPersonTests;
      console.log(paractic,test)
       if(paractic || test || personParactic || personTest){
         let appointData={};
         const todayDate = new Date();
         const formattedDate = `${(todayDate.getMonth() + 1).toString().padStart(2, '0')}/${todayDate.getDate().toString().padStart(2, '0')}/${todayDate.getFullYear()} ${todayDate.getHours().toString().padStart(2, '0')}:${todayDate.getMinutes().toString().padStart(2, '0')} ${todayDate.getHours() >= 12 ? 'PM' : 'AM'}`;
         
          const nextAppointData=reciveDataCheck?.nextAppointDate || formattedDate;
         // const nextAppointData= formattedDate;
           appointData= {Appointment:{...reciveDataCheck,nextAppointDate:nextAppDate,appointmentDate:nextAppointData,feedback:"null"},AppointmentPractics:paractic,AppointmentTests:test,AppointmentPersonPractics:personParactic,AppointmentPersonTests:personTest};
           console.log(appointData)
        
       
        
        const responce = await fetch(GlobalVariables.apiUrl + "/api/User/AddAppointment",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(appointData),
        }

      );
        const data=await responce.json();
        console.log(data)
        
      }
      else{
        console.log("do data")
      }
    
    }catch(e){console.log(e)}
  }

  

  return (
    <div className="">
      <div className="text-white text-center fs-1" style={{borderBottomLeftRadius:'90%' ,height:180,width:'100%',backgroundColor:"#AB91D9",}}>
      <div className=" p-5">New Appointment</div>
      </div>
      {/* <div className="fs-2 mt-2" style={{ marginLeft: '2.25rem' }}>Name</div>
      <hr/> */}
      <div className="fs-4 " style={{ marginLeft: '1.25rem' }}>Date : <Datetime 
      onChange={handleDateChange} 
      dateFormat="MM/DD/YYYY "  
      timeFormat="HH:mm A"
      value={date}
      
      /></div>
      {/* <div className="fs-4 mt-2" style={{ marginLeft: '1.25rem' }}>
      <input
        type="checkbox"
        className="form-check-input"
        // checked={checkedItems[item.id] || false} // Check if item is checked
        // onChange={(e) => handleCheckboxChange(e, item.id)}
      />
      <span style={{ marginLeft: '1.25rem' }}>Repeat</span>
      </div> */}
    <div  className="d-flex justify-content-between align-items-center fs-4 mt-2" style={{ marginLeft: '1rem' }}>
      <span>Add Practice</span>
      <button className="btn btn-primary m-3 fs-5 "style={{height:'33px',backgroundColor:'#DBBDE7' }}
      onClick={()=>{navigate('/Practice',{state:reciveDataCheck})}}
      > Add</button>
    </div>
    <div  className="d-flex justify-content-between align-items-center fs-4 mt-2  mb-5" style={{ marginLeft: '1.25rem', }}>
      <span>Add Test</span>
      <button className="btn btn-primary m-3  fs-5  "  style={{height:'33px',backgroundColor:'#DBBDE7',marginLeft: '3.25rem'  }}
      onClick={()=>{navigate('/Test',{state:reciveDataCheck})}}
      >Add</button>
    </div>
    {reciveDataCheck.careGiver &&
      <div  className="d-flex justify-content-between align-items-center fs-4 mt-2 mb-5" style={{ marginLeft: '1.25rem', }}>
          <span>Add Person Practice</span>
          <button className="btn btn-primary m-3  fs-5  "  style={{height:'33px',backgroundColor:'#DBBDE7',marginLeft: '3.25rem'  }}
          onClick={()=>{navigate('/PersonPractice',{state:reciveDataCheck})}}
          >Add</button>
    </div>
   }
   {reciveDataCheck.careGiver &&
      <div  className="d-flex justify-content-between align-items-center fs-4 mt-2 mb-5" style={{ marginLeft: '1.25rem', }}>
          <span>Add Person Test</span>
          <button className="btn btn-primary m-3  fs-5  "  style={{height:'33px',backgroundColor:'#DBBDE7',marginLeft: '3.25rem'  }}
          onClick={()=>{navigate('/PersonTest',{state:reciveDataCheck})}}
          >Add</button>
    </div>
   }
    <div className='text-center'>
    {reciveDataCheck.careGiver ? (
        <button className="btn btn-primary btn-lg " style={{ backgroundColor: '#DBBDE7' }} onClick={addAppointment}>Assign</button>
    ) : (
        <button className="btn btn-secondary btn-lg " style={{ backgroundColor: '#DBBDE7' }} onClick={addAppointment}>Save Appointment</button>
    )}
</div>
    </div>
  )
}
export default AddNewAppointment