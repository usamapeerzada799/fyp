import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalVariables from "./Globel";

const NewPatientRequest = () => {
    const[doctor,setDoctor]=useState({})
    const[data,setData]=useState([])
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const receivedData = location.state;
                setDoctor(receivedData.Doctor)
                console.log(receivedData)
                //const response = await fetch(GlobalVariables.apiUrl+`/api/User/NewPatientRequest?uid=${receivedData.uid}`);
               // const dataa = await response.json();
                //console.log(dataa);
                setData(receivedData.Purposal)
                
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
          
         fetchData();
    },[])
    const AcceptPatienRequest=async(pid)=>{

        const response = await fetch(GlobalVariables.apiUrl+`/api/User/AcceptPatientRequest?pid=${pid}&uid=${doctor.uid}`);
        const dataa = await response.json();
        console.log(dataa)
        const newdata=data.filter(item=>item.pid!==pid)
        setData(newdata);
    }
  return (
    <div>
    <div className="text-black text-center fs-1" style={{ borderBottomRightRadius: '90%', height: 120, width: '100%', backgroundColor: "#DBBDE7" }}>
    <span className="align-items-center  text-black mt-2">New Patient Requests</span>
      
      </div>
      {!data?.[0]?.pid  && <h2>No Any new request</h2>}
    {data?.map((item,index) =>{
      return(
      <div key={index} className="d-grid mt-1">
          <div className="btn-lg btn btn-outline-info"  style={{ backgroundColor: '#DBBDE7', borderRadius: '10px'}}>
          <div className="row align-items-center  text-black " style={{ backgroundColor: '#DBBDE7', borderRadius: '10px' }}>
          <div className="d-flex flex-row col-4">
              <img className="img-fluid rounded-circle" style={{ width: '100px', height: '85px' }} src={GlobalVariables.apiUrl+item.profPicPath} alt="" />
              <div className="d-flex flex-column">
              <span className="mt-2 ml-2" style={{marginLeft:'0.5rem'}}>{item.name}</span>
              <span className="mt-2 ml-2" style={{marginLeft:'0.5rem'}}>Stage:{item.stage}</span>
              </div>
          </div>
          <div className="col-8">
              <div className="">
                  <div className="d-flex flex-column float-end col-6 w-50">
                      
                      <button className=" w-10 btn btn-primary btn-lg text-black" onClick={()=>{AcceptPatienRequest(item.pid)}}  style={{background:'#EDDDE4'}}>Accept</button>
                      <button className=" w-10 btn btn-primary btn-lg text-black" onClick={()=>{AcceptPatienRequest(item.pid)}}  style={{background:'#EDDDE4'}}>Reject</button>
                      
                      
                  </div>
                  
                  {/* <span className="float-end">{`${formattedHours}:${formattedMinutes} ${ampm}`}</span> */}
              </div>
              </div>
          </div>
          </div>
          <hr />
      </div>
      )})}</div>
  )
}
export default NewPatientRequest