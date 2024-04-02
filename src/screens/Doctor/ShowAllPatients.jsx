import { useEffect } from "react"
import { useState } from "react"
import GlobalVariables from "./Globel"
import {useLocation,useNavigate} from 'react-router-dom'

const ShowAllPatients = () => {
    const[allpatient,setAllPatients]=useState([])
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const fetchData=async()=>{
        try {
            const user=location.state;
            console.log(user)
            const responce = await fetch(GlobalVariables.apiUrl+`/api/User/GetAllpatiets?DId=${user.uid}`);
            const data=await responce.json();
            console.log(data);
            setAllPatients(data)

        } catch (error) {
            console.log(error);
        }
    }
    fetchData()
    },[])
    return (
    <div>ShowAllPatients
        <div>
        {allpatient.map((item,index) =>{ 

             return (
              <div key={index} className="d-grid">
                <button className="btn-lg btn " onClick={()=>{ navigate('/AllAppointsments',{state:item})}}>
                <div className="row align-items-center  text-light " style={{ backgroundColor: '#0DB495', borderRadius: '10px' }}>
                  <div className="col-4">
                    <img className="img-fluid rounded-circle" style={{ width: '100px', height: '85px' }} src={GlobalVariables.apiUrl+item.profPicPath} alt="" />
                  </div>
                  <div className="d-flex flex-column col-5">
                    <span>{item.name}</span>
                  </div>
                </div>
                </button>
                
              </div>
            )})}
        </div>
    </div>
  )
}
export default ShowAllPatients