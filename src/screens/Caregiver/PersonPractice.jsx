import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useLocation,useNavigate} from 'react-router-dom'
//import '../../css/Doctor/Practice.scss'
import GlobalVariables from '../Doctor/Globel';
import Store from "../Store";
const PersonPractice = () => {
  const [data,setData]=useState([]);
  const [pracTitle,SetpracTitle]=useState([]);
  const [singlePracticData,setSinglePractData]=useState([{eText:""}]);
  const [toggle,settoggle]=useState(true)
  const [toglersign,setToglersign]=useState('>')
  const navigate = useNavigate();
  const location = useLocation();
  const [reciveDataCheck,setReciveDataCheck]=useState({});
  const [AppointmentPersonPractics,setAppointmentPractics]=useState([])
  let receivedData=''

 
  useEffect(()=>{
    const fetchDAta = async()=>
    {
     
       
    
       try{ 
        receivedData = location.state;
        console.log(receivedData)
        setReciveDataCheck(receivedData)
        
         let patientId = receivedData.patientId ? receivedData.patientId : 0;
        const responce = await fetch(GlobalVariables.apiUrl+`/api/Person/GetPersonpracticesWithDetail?Uid=${receivedData.userId}`);
        const data=await responce.json();
        console.log(data);
        setData(data);
        const uniqueItems = data.filter((item, index) =>{ 
          const firstIndex= data.findIndex(obj => obj.title === item.title) === index;
        if (firstIndex) {
          // Add your additional properties here
          item.togleSign = ">";
          item.toggle = true;
        }
        return firstIndex;
        
       });
       console.log(uniqueItems)
        SetpracTitle(uniqueItems)
        
 
       
       }catch(e){console.log(e)}
    }
    fetchDAta()
  },[]) 
 
  useEffect(()=>{
    console.log(reciveDataCheck)
    console.log(AppointmentPersonPractics)
  },[pracTitle,reciveDataCheck,AppointmentPersonPractics]);
   const singlePracData=(e,ind)=>{
    
    if(e.toggle){ 
    const pracdata = data.filter((a)=>{
        if(a.title===e.title){
        return e;
        }
      })
      
      setSinglePractData(pracdata);
      SetpracTitle(pracTitle.map((item, index) => 
      
      {
        if (index === ind) {
            return { ...item, togleSign: "v", toggle: false };
        } else {
          return { ...item, togleSign: ">", toggle: true };
        }
    }));
      settoggle(false)
      setToglersign('v')
    }
    else{
      setSinglePractData('')
      SetpracTitle(pracTitle.map((item, index) => {
        if (index === ind) {
            return { ...item, togleSign: ">", toggle: true };
        } else {
            return item;
        }
    }));
      settoggle(true)
      setToglersign('>')
    }
   }
   const handleCheckboxChange = (e, personPracticeId) => {
    const { checked } = e.target;
  
    setAppointmentPractics(prevState => {
      const index = prevState.findIndex(item => item.personPracticeId === personPracticeId);
  
      if (checked) {
        // If checked, insert the object next to the current index
        const updatedState = [...prevState];
        updatedState.splice(index + 1, 0, { personPracticeId });
        return updatedState;
      } else {
        // If unchecked, remove the object with matching pracId
        return prevState.filter(item => item.personPracticeId !== personPracticeId);
      }
    });
  };
 const submitHandler=()=>{
  try{
  Store.dispatch({
    type: 'ADD_OBJECT',
    payload: {
      collectionName: 'objects3',
      object: {AppointmentPersonPractics}
    }
  });
  navigate('/AddNewAppointment',{state:reciveDataCheck})
 }catch(e){console.log(e)}
}
  
  return (
    <div className="container">
        <span className="fs-3 d-block text-center fw-bold">
          Person Practice
        </span>
        
        {pracTitle.map((a,index)=>{
          
        return(
          <div key={index}>
          <div className="row align-items-center m-1 text-Black" style={{ backgroundColor: '#DBBDE7', borderRadius: '10px'}}>
            <div className="col">
              {(reciveDataCheck?.patientId ) &&   
                <div className="col-1">
                  <input
                type="checkbox"
                className="form-check-input"
                 // Check if item is checked
                 onChange={(e) => handleCheckboxChange(e, a.practiceId)}
              />
                </div >
                
                }
              <h3 className={`${a.flag ?'text-success' : 'text-black' } d-inline p-2 fs-5`}>{a.title}</h3>
              <hr/>
            </div>
            <div className="col-auto">
              <button className="btn btn-light" onClick={() => singlePracData(a, index)}>{a.togleSign}</button>
            </div>
          </div>

            {singlePracticData && singlePracticData.some(item => item.title === a.title) && (
             <div className="container">
             <div className="row">
               {singlePracticData.map((item,index) => (
                
                 <div key={index} className="col-lg-3 col-md-4 col-sm-4 col-4"> {/* Adjust column sizes as needed */}
                   <div className="togleData Practic" >
                     <img src={GlobalVariables.apiUrl + item.picPath} className="img-fluid " style={{height: '150px'}} alt="Practice Image" />
                     <h4>{item.name}</h4>
                   </div>
                 </div>
               ))}
             </div>
           </div>
          )}
            
            
          </div>
            
          )
        })}
        <div >
          
          <button className="btn btn-primary text-black"  style={{marginLeft:'0.5rem', backgroundColor: '#DBBDE7', borderRadius: '10px'}} onClick={()=>{navigate('/AddPersonPratice',{state:reciveDataCheck})}}>
            ADD new Practice
          </button>
          {(reciveDataCheck?.patientId ) &&
          <button className="btn btn-primary text-black"  style={{marginLeft:'0.5rem', backgroundColor: '#DBBDE7', borderRadius: '10px'}} onClick={()=>submitHandler()}>
          ADD to Appointment
          </button>
          }
        </div>
       
    </div>
  )
}
export default PersonPractice