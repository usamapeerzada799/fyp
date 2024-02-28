import { useState } from "react"

const Appointment = () => {
const[appointData,setApointData]=useState([{id:1,stage:"II", name:'usama',image:"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600center;",time:"12:12pm"},
{id:1,stage:"II", name:'usama',image:"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600center;",time:"12:12pm"},
{id:1,stage:"II", name:'usama',image:"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600center;",time:"12:12pm"}   ])
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
    <div className="container">
        <div className="card">
            <div className="doctor" >
                <img  src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600center;" alt="" />
                <div className="dInfo">
                <span>profession</span>
                <br/>
                <span>Name</span>
                
                </div>
                     
            </div>
          <hr/>
          <span>Todays Appointments</span> 
            <div className="todayApp">
            {appointData.map((item) => {
                return(
                    <div key={item.id} className="appoint"> 
                        <img style={{height:'100px',width:'100px'}} src={item.image} alt="" />
                        <div className="appinfo">
                        <span>{item.name}</span><span>Stage {item.stage}</span><span style={{textAlign:"right"}} >{item.time}</span>
                        <hr/>
                        </div>
                        <hr/>
                    </div>
                )
            })}
            

            </div>   
        </div>
        </div>
  )
}
export default Appointment