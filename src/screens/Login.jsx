import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GlobalVariables from '../screens/Doctor/Globel'
import { useDataContext } from './DataContext.jsx';

const Login = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  //const { sharedData, setSharedData } = useDataContext();
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
          
          if(data.type=="doctor"){
          navigate('/Appointment', { state: data })
          setSharedData(data);
          }
         else if(data.type=="Caregiver")
          navigate('/CaregiverMain', { state: data })
         else
         navigate('/PatientMain', { state: data })
        }
       

       }catch(e){
        console.log("user")
       }
      }
      else(alert("Please fill all fields"))
    }
  return (
    <div className=""
    
    >
       <div className="text-white text-center fs-1" style={{ borderBottomRightRadius: '90%', height: 120, width: '100%', backgroundColor: "#003cb3" }}>
        <div className=" p-5">Login</div>
      </div>
      <div className="container-fluid h-100 d-flex justify-content-center align-items-center mt-1">
        <div className="col-md-6 rounded">
          <Card className="fs-5 mt-5" style={{ borderRadius: '10px' }}>
            <Card.Body>
              <Form >
                <Form.Group controlId="formBasicName" className='mt-4'>
                  <Form.Control type="text" placeholder="Enter username" name="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required className="form-control-lg" />
                </Form.Group>

               

                <Form.Group controlId="formBasicPassword" className='mt-4'>
                  <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required className="form-control-lg" />
                </Form.Group>
                </Form>
            </Card.Body>
          </Card>
          </div>
          </div>
          <div className='d-grid col-6 mx-auto m-3'>
    <button className="btn btn-primary fs-3" type="button" onClick={()=>login()}>Login</button>
    </div>
    
    
</div>
  )
}
export default Login