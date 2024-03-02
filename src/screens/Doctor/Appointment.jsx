import { useState,useEffect } from "react"
import {useLocation} from 'react-router-dom'
import GlobalVariables from "./Globel"
const Appointment = () => {
    const[appointData,setApointData]=useState([{id:1,stage:"II", name:'usama',image:"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600center;",time:"12:12pm"},
    {id:1,stage:"II", name:'usama',image:"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600center;",time:"12:12pm"},
    {id:1,stage:"II", name:'usama',image:"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600center;",time:"12:12pm"}   ])
    const[appointmentsData,setAppointmentsData]=useState([])
    const[doctor,setDoctor]=useState({})
    const location = useLocation();
    useEffect(()=>{
        const fetchData = async () => {
          try {
            
            const receivedData = location.state;

            console.log(receivedData)
            setDoctor(receivedData)
            const currentDate = new Date();

            // Extract individual components (year, month, day, etc.)
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
            const day = currentDate.getDate();
            
            // Format the date as a string (adjust the format as needed)
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
          
           
              const response = await fetch(GlobalVariables.apiUrl+'/api/User/GetAppointments?Did='+receivedData.uid+'&date='+formattedDate+'');
              const data = await response.json();
              console.log(data);
              setAppointmentsData(data);
             
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
        
       fetchData();
       
      },[])
 const todayAppointment=({item})=>{
        console.log(item)
        return(
            <div>
                {/* <img src={item.image} alt="" />
                <span>{item.name}</span><span>{item.time}</span> */}
            </div>
        )
    }
    
    return (
        <div className="container mt-5">
        <div className="card">
          <div className="row align-items-center m-1" style={{ backgroundColor: '#17a2b8', borderRadius: '10px' }}>
            <div className="col-4">
              <img className="img-fluid rounded-circle" style={{ width: '100px', height: '100px' }} src={GlobalVariables.apiUrl+doctor.profPicPath} alt="" />
            </div>
            <div className="col-8">
              <div className="doctor">
                <div className="fs-5 text-light">
                  <span>Dimencia Speciallist</span>
                  <br />
                  <span>{doctor.name}</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h5 className="mt-3 fs-3">Today's Appointments</h5>
          <div className="todayApp" >
            {appointmentsData.map((item,index) => (
              <div key={index} className="d-grid">
                <button className="btn-lg btn btn-outline-info">
                <div className="row align-items-center m-1 text-light " style={{ backgroundColor: '#0DB495', borderRadius: '10px' }}>
                  <div className="col-4">
                    <img className="img-fluid rounded-circle" style={{ width: '100px', height: '85px' }} src={GlobalVariables.apiUrl+item.profPicPath} alt="" />
                  </div>
                  <div className="col-8">
                    <div className="fs-5">
                        <div className="d-flex flex-column col-8">
                            <span>{item.name}</span>
                            <span>Stage {item.stage}</span>
                            
                         </div>
                        
                        <span className="float-end">{item.nextAppointDate}</span>
                    </div>
                    </div>
                </div>
                </button>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
      
  )
}
export default Appointment