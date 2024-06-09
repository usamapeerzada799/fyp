import { useEffect } from "react"
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from '../Doctor/Globel';
const NextVisit = () => {
    const location = useLocation();
  const receivedData = location.state;
  console.log(receivedData)
    useEffect(() => {
        const fetchData=async()=>{
            const responce = await fetch(`http://192.168.1.9/LernSpace/api/User/NextVisit?pid=7`);
            const data=await responce.json();
            console.log(data);
            setPatientId(data)
          }
          fetchData();
    }, [])
  return (
    <div>
        <div className="text-white text-center fs-1" style={{borderBottomLeftRadius:'90%' ,height:180,width:'100%',backgroundColor:"#AB91D9",}}>
        <div className=" p-5">Next Visit</div>
        </div>
        <div className="container">
        <div className="row justify-content-center mt-5">
            <div className="col-lg-8 col-10 col-sm-8">
            <div className="fs-5 text-center gap-3 border border-dark border-3  p-4 rounded">
                <div className="row">
                <div className="col">
                    <span className="fw-bold">Date</span>
                    <span className="d-block">22-Oct-2023</span>
                </div>
                </div>
                <hr/>
                <div className="row">
                <div className="col">
                    <span className="fw-bold">Time</span>
                    <span className="d-block">12:30 PM</span>
                </div>
                </div>
                <hr/>
                <div className="row">
                <div className="col">
                    <span className="fw-bold">Doctor</span>
                    <span className="d-block">Dr. Ali Haider</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="text-white text-center fs-1 mt-2" style={{borderTopRightRadius:'90%' ,height:133,width:'100%',backgroundColor:"#AB91D9",}}>
     
     </div>
    </div>
  )
}
export default NextVisit