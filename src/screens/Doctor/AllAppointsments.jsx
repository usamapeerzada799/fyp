import { useEffect, useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from './Globel';
import Appointment from './Appointment';
const AllAppointsments = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const[appointments,setApplointments]=useState([]);
    const[patientId,setPatientID]=useState({})
    useEffect(()=>{
        const fetchData= async()=>{
           
            try {
                const patient=location.state;
                console.log(patient)
                
                
                setPatientID(patient);
                const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetAllAppointmentsDates?pid=${patient.pid}&uid=${patient.uid}`);
                const data=await responce.json();
                console.log(data);
                setApplointments(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])
  return (
    <div>AllAppointsments
        <div>
        {appointments.map((item,index) =>{ 
            const AppointDateTime = new Date(item.appointmentDate);
            const year = AppointDateTime.getFullYear();
            const month = AppointDateTime.getMonth() + 1; // Months are zero-indexed
            const day = AppointDateTime.getDate();
            
            // Format the date components
            const formattedMonth = month < 10 ? '0' + month : month;
            const formattedDay = day < 10 ? '0' + day : day;
            const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
            
            // Extract and format time components
            const hours = AppointDateTime.getHours();
            const minutes = AppointDateTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
            
            // Combine date and time
            const formattedDateTime = `${formattedDate} ${formattedTime}`;
            return (
            <div key={index} className="d-grid">
            <button className="btn-lg btn " onClick={()=>{ navigate('/AppointmentDetails',{state:{...item,patientId:patientId.pid,userId:patientId.uid}})}}>
            <div className="row align-items-center  text-black " style={{ backgroundColor: '#DBBDE7', borderRadius: '10px' }}>
                
                <div className="d-flex flex-column col-5">
                <span>{formattedDateTime}</span>
                </div>
            </div>
            </button>
            
            </div>
            )})}
        </div>
    </div>
  )
}
export default AllAppointsments