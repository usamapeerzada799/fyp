import { useEffect } from "react"
import { useState } from "react"
import GlobalVariables from "./Globel"
import {useLocation,useNavigate} from 'react-router-dom'

const ShowAllPatients = () => {
    const[allpatient,setAllPatients]=useState([])
    const[Users,setUsers]=useState({})
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const fetchData=async()=>{
        try {
            const user=location.state;
            console.log(user)
            setUsers(user)
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
    <div>Patients List
        <div>
        {allpatient.map((item,index) =>{ 

             return (
              <div key={index} className="d-grid">
                <button className="btn-lg btn " onClick={()=>{ navigate('/AllAppointsments',{state:{...item,uid:Users.uid}});console.log(item)}}>
                <div className="row align-items-center  text-black " style={{ backgroundColor: '#DBBDE7', borderRadius: '10px' }}>
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