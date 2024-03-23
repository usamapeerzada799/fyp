import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useLocation,useNavigate} from 'react-router-dom'
//import '../../css/Doctor/Practice.scss'
import GlobalVariables from './Globel'
const Practice = () => {
  const [data,setData]=useState([]);
  const [pracTitle,SetpracTitle]=useState([]);
  const [singlePracticData,setSinglePractData]=useState([{eText:""}]);
  const [toggle,settoggle]=useState(true)
  const [toglersign,setToglersign]=useState('>')
  const navigate = useNavigate();
  const location = useLocation();
  const [reciveDataCheck,setReciveDataCheck]=useState({});
  const [practicId,setPracticId]=useState()
  let receivedData=''

 
  useEffect(()=>{
    const fetchDAta = async()=>
    {
     
       
    
       try{ 
        receivedData = location.state;
        console.log(receivedData)
        setReciveDataCheck(receivedData)
        const responce = await fetch(GlobalVariables.apiUrl+`/api/Practice/userDefindPractices?Uid=${receivedData.userId}`);
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
  },[pracTitle,reciveDataCheck]);
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
  return (
    <div className="container">
        <span className="fs-3 d-block text-center fw-bold">
          Practice
        </span>
        
        {pracTitle.map((e,index)=>{
        return(
          <div key={index}>
          <div className="row align-items-center m-1 text-light" style={{ backgroundColor: '#0DB495', borderRadius: '10px'}}>
            <div className="col">
              {reciveDataCheck.patientId &&   
                <div className="col-1">
                  <input
                type="checkbox"
                className="form-check-input"
                 // Check if item is checked
                 onChange={() =>{ 
                  setReciveDataCheck({...reciveDataCheck,pracId:e.pracId});
                 console.log(reciveDataCheck)
                }}
              />
                </div >
                
                }
              <h3 >{e.title}</h3>
              <hr/>
            </div>
            <div className="col-auto">
              <button className="btn btn-light" onClick={() => singlePracData(e, index)}>{e.togleSign}</button>
            </div>
          </div>

            {singlePracticData && singlePracticData.some(item => item.title === e.title) && (
             <div className="container">
             <div className="row">
               {singlePracticData.map((item,index) => (
                
                 <div key={index} className="col-lg-3 col-md-4 col-sm-4 col-4"> {/* Adjust column sizes as needed */}
                   <div className="togleData Practic" >
                     <img src={GlobalVariables.apiUrl + item.picPath} className="img-fluid " style={{height: '150px'}} alt="Practice Image" />
                     <h4>{item.eText}</h4>
                   </div>
                 </div>
               ))}
             </div>
           </div>
          )}
            
            
          </div>
            
          )
        })}
        <div className="BtnAddpractic">
          
          <button className="btn btn-primary" onClick={()=>{navigate('/Addpractice',{state:reciveDataCheck})}}>
            ADD new Practice
          </button>
          {reciveDataCheck.patientId &&
          <button className="btn btn-primary" style={{marginLeft:'0.5rem'}} onClick={()=>{navigate('/AddNewAppointment',{state:reciveDataCheck})}}>
          ADD to Appointment
          </button>
          }
        </div>
       
    </div>
  )
}
export default Practice