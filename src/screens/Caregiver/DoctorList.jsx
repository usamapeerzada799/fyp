import { useEffect, useState } from "react"
import GlobalVariables from "../Doctor/Globel"

const DoctorList = () => {
    const [data,setData]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            const responce=await fetch(GlobalVariables.apiUrl+`/api/User/GetDoctors`)
            const dataa=await responce.json()
            if(dataa!=null){
              setData(dataa)
              console.log(dataa)
            }
          }
          fetchData()
    },[])
  return (
    <div>
      {data.map((item,index) =>{
        return(
        <div key={index} className="d-grid">
            <div className="btn-lg btn btn-outline-info"  style={{margin:'0.5rem', backgroundColor: '#DBBDE7', borderRadius: '10px'}}>
            <div className="row align-items-center m-1 text-black " style={{ backgroundColor: '#DBBDE7', borderRadius: '10px' }}>
            <div className="d-flex flex-row col-4">
                <img className="img-fluid rounded-circle" style={{ width: '100px', height: '85px' }} src={GlobalVariables.apiUrl+item.profPicPath} alt="" />
                <span className="mt-2 ml-2" style={{marginLeft:'0.5rem'}}>{item.name}</span>
            </div>
            <div className="col-8">
                <div className="fs-5">
                    <div className="d-flex flex-column float-end col-8 w-50">
                        
                        <button className="border border-light w-100" disabled={true} style={{background:'#DBBDE4'}}>abc</button>
                        
                        
                    </div>
                    
                    {/* <span className="float-end">{`${formattedHours}:${formattedMinutes} ${ampm}`}</span> */}
                </div>
                </div>
            </div>
            </div>
            {/* <hr /> */}
        </div>
        )})}
    </div>
  )
}
export default DoctorList