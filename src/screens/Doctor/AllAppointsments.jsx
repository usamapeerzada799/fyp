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
                setPatientID(patient);
                const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetAllAppointmentsDates?pid=${patient.pid}`);
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

            return (
            <div key={index} className="d-grid">
            <button className="btn-lg btn " onClick={()=>{ navigate('/AppointmentDetails',{state:{...item,patientId:patientId.pid}})}}>
            <div className="row align-items-center  text-light " style={{ backgroundColor: '#0DB495', borderRadius: '10px' }}>
                
                <div className="d-flex flex-column col-5">
                <span>{item.appointmentDate}</span>
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