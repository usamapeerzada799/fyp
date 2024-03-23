import { useEffect, useState } from 'react';
import Datetime, { contextType } from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from './Globel';
const AddNewAppointment = () => {
  const [date,setDate]=useState(new Date())
  const [addAppoinmentData,setAddAppointmentData]=useState({})
  const [reciveDataCheck,setReciveDataCheck]=useState({})
  const[nextAppDate,setNextAppDate]=useState()
  const navigate = useNavigate();
  const location = useLocation();
  let receivedData={}
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
      
      if(reciveDataCheck?.testId && reciveDataCheck?.pracId){
        const appointData= {...reciveDataCheck,nextAppointDate:nextAppDate,appointmentDate:reciveDataCheck.nextAppointDate,feedback:"null"};
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
        const data=responce.json();
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
      <div className="fs-2 mt-2" style={{ marginLeft: '2.25rem' }}>Name</div>
      <hr/>
      <div className="fs-4 " style={{ marginLeft: '1.25rem' }}>Date : <Datetime 
      onChange={handleDateChange} 
      dateFormat="MM/DD/YYYY "  
      timeFormat="HH:mm A"
      value={date}
      
      /></div>
      <div className="fs-4 mt-2" style={{ marginLeft: '1.25rem' }}>
      <input
        type="checkbox"
        className="form-check-input"
        // checked={checkedItems[item.id] || false} // Check if item is checked
        // onChange={(e) => handleCheckboxChange(e, item.id)}
      />
      <span style={{ marginLeft: '1.25rem' }}>Repeat</span>
      </div>
    <div  className="fs-4 mt-2" style={{ marginLeft: '1rem' }}>
      <span>Add Practice</span>
      <button className="btn btn-primary m-3 fs-5"style={{height:'33px',backgroundColor:'#DBBDE7' }}
      onClick={()=>{navigate('/Practice',{state:reciveDataCheck})}}
      > Add</button>
    </div>
    <div  className="fs-4  mb-5" style={{ marginLeft: '1.25rem', }}>
      <span>Add Test</span>
      <button className="btn btn-primary   fs-5  "  style={{height:'33px',backgroundColor:'#DBBDE7',marginLeft: '3.25rem'  }}
      onClick={()=>{navigate('/Test',{state:reciveDataCheck})}}
      >Add</button>
    </div>
    <div className='text-center'>
    <button className="btn btn-primary btn-lg " style={{backgroundColor:'#DBBDE7' }}
    onClick={addAppointment}
    >Save Appointment</button>
    </div>
    </div>
  )
}
export default AddNewAppointment