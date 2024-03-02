import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GlobalVariables from '../screens/Doctor/Globel'
const Login = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [userData,setUserData]=useState({})
  const navigate = useNavigate();
  const login = async()=>
    {
      if(username && password){
       try{ 
        const responce = await fetch(GlobalVariables.apiUrl+`/api/User/SignIn?username=${username}&password=${password}`);
        const data=await responce.json();
        console.log(data);

        if(data==="invalid Username Or Password"){
          alert('Invalid username or password');
        }else{
          setUserData(data)
          navigate('/Appointment', { state: data })
        }
       }catch(e){
        console.log("user")
       }
      }
      else(alert("Please fill all fields"))
    }
  return (
    <div className="container d-flex  justify-content-center flex-column align-items-center mt-5"
    style={{ backgroundColor: '#17a2b8', borderRadius: '10px' }}
    >
    <span className='fs-1' >Solw Lerner</span>
    <div className="input-group mt-3 align-items-center">
      <span className="input-group-text fs-5 .bg-danger"> Username</span>
      <input type="text" className="form-control col-sm-4 fs-5" onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username"/>
    </div>
    <div className="input-group mt-3 ">
      <span className="input-group-text fs-5">password</span>
      <input type="password" className="form-control col-sm-4 fs-5" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter password"/>
    </div>
    <div className='d-grid col-6 mx-auto m-3'>
    <button className="btn btn-primary fs-3" type="button" onClick={()=>login()}>Login</button>
    </div>
</div>
  )
}
export default Login