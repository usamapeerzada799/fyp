import React, { useState,useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from './Doctor/Globel';
import styled from 'styled-components';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    type: '',
    age: '',
    gender: '',
    picture: null
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const[reciveDataCheck,setReciveDataCheck]=useState({})
  const[data,setData]=useState([])
  const[DoctorId,setDoctorId]=useState(0)
  const navigate = useNavigate()
  const location=useLocation();
  useEffect(() => {
    try{
    const recivedata=location.state;
    if(recivedata?.Uid){
      const fetchData=async()=>{
        const responce=await fetch(GlobalVariables.apiUrl+`/api/User/GetDoctors`)
        const dataa=await responce.json()
        if(dataa!=null){
          setData(dataa)
          console.log(dataa)
        }
      }
      fetchData()
    }
    setReciveDataCheck(recivedata)
    }catch(e){console.log('no data')}
    }, [formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePictureChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0]
    });
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append('name', formData.name);
    Data.append('username', formData.username);
    Data.append('password', formData.password);
    if (formData.picture) {
      Data.append('profilePic', formData.picture);
    }
  
    // Checking if caregiverId exists in reciveDataCheck
    if (reciveDataCheck?.Uid) {
      Data.append("caregiverid", reciveDataCheck.Uid);
      Data.append('age', formData.age);
      Data.append('gender', formData.gender);
      try {
        Data.append('DoctorId',DoctorId)
        const response = await fetch(GlobalVariables.apiUrl+'/api/User/CaregiverRegisterPatient', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: Data,
        });
        const data = await response.json();
        
        console.log(data)
        setData(data);
        if(data=='registerd'){
          alert(data)
          navigate('/')
        }
        else
         alert(data)
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      Data.append('type', formData.type);
      try {
        const response = await fetch(GlobalVariables.apiUrl + '/api/User/SignUp', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: Data,
        });
        const data = await response.json();
        setData(data);
        console.log(data);
        if(data=='registerd')
          navigate('/')
        else
         alert(data)
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  const SignUpprofileImage = styled.div`
  width: 100%;
	height: 100%;
    /* background-color: #595959; */
    margin-bottom: 0.9rem;
    /* margin-top: 0rem; */
    display: flex;
    align-items: center;
    justify-content: center;

  `
  const SignUpProfileImageContainer = styled.div`
  width: 10rem;
	height: 10rem;
    background-color: #a3a3a3;
    border-radius: 50%;
    filter: drop-shadow(0 0 0.2rem #001623);

  `
  const SignUpMovieProfileImage=styled.input`
  width: 10rem;
	height: 10rem;
    opacity: 0;
	overflow: hidden;
    border-radius: 50%;
	position: absolute;
	z-index: 1;

  `
  const SignUpMovieProfileImage2=styled.img`
  width: 10rem;
	height: 10rem;
    border-radius: 0.4rem;
    object-fit:cover;
    border-radius: 50%;
    z-index: 1;
    border: 0.1rem solid #001623;

  `
  const SignUptextChooseImage=styled.p`
  position: absolute;
  top: 0;
  width: 100%;
  font-size: 0.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(0, 0, 0);
  z-index: -1;

  `
  return (
    <div>
      <div className="text-black text-center fs-1" style={{ borderBottomRightRadius: '90%', height: 120, width: '100%', backgroundColor: "#DBBDE7" }}>
        {reciveDataCheck ? ( <div className=" p-5">Patient Signup</div> ):( <div className=" p-5">SignUp</div>)}
        <div className=" p-5">SignUp</div>
      </div>
      <div className="container-fluid h-100 d-flex justify-content-center align-items-center mt-1">
        <div className="col-md-6 rounded">
          <Card className="fs-5 " style={{ borderRadius: '10px' }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicPicture" className='mt-3'>
                 <SignUpprofileImage>
                  <SignUpProfileImageContainer>
                        <SignUpMovieProfileImage
                        type="file"
                        accept="image/*"
                        id="custom-file"
                        onChange={handlePictureChange}
                      />
                    
                        <SignUpMovieProfileImage2
                          src={selectedImage}
                          alt=""
                          
                        />
                        <SignUptextChooseImage>Click to Choose Image</SignUptextChooseImage>
                      </SignUpProfileImageContainer>
                  </SignUpprofileImage>
                  </Form.Group>
                <Form.Group controlId="formBasicName" className='mt-4'>
                  <Form.Control type="text" placeholder="Enter full name" name="name" value={formData.name} onChange={handleChange} required className="form-control-lg" />
                </Form.Group>

                <Form.Group controlId="formBasicUsername" className='mt-4'>
                  <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} required className="form-control-lg" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className='mt-4'>
                  <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required className="form-control-lg" />
                </Form.Group>
                {!reciveDataCheck &&
                <Form.Group controlId="formBasicDropdown" className='mt-4'>
                  <select className="form-control fs-5" name="type" onChange={handleDropdownChange} required>
                    <option value="">Select type</option>
                    <option value="Doctor">Doctor</option>
                    
                    <option value="Caregiver">Caregiver</option>
                  </select>
                </Form.Group>
                }
                {reciveDataCheck && (
                  <>
                    <Form.Group controlId="formBasicAge" className='mt-4'>
                      <Form.Control type="number" placeholder="Enter age" name="age" value={formData.age} onChange={handleChange} required className="form-control-lg" />
                    </Form.Group> 

                    <Form.Group controlId="formBasicGender" className='mt-4'>
                      <Form.Label>Gender</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label="Male"
                          type="radio"
                          name="gender"
                          value="male"
                          onChange={handleChange}
                          required
                        />
                        <Form.Check
                          inline
                          label="Female"
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={handleChange}
                          required
                        />
                        <Form.Check
                          inline
                          label="Other"
                          type="radio"
                          name="gender"
                          value="other"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Form.Group>
                  </>
                )}

                {/* <Form.Group controlId="formBasicPicture" className='mt-3'>
                 <label htmlFor="custom-file" className="btn btn-secondary">Choose Picture</label>
                    <input type="file" id="custom-file" accept="image/*" onChange={handlePictureChange} style={{ display: 'none' }} required />
                    
                  <div className="input-group">
                   {selectedImage && <img className='mt-1' src={selectedImage} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} />}
                </div>
                </Form.Group> */}
               {reciveDataCheck?.Uid && <div>
                <h2>Select doctor</h2>
      {data.map((item,index) =>{
        return(
        <div key={index} className="d-grid">
            <div className="btn-lg btn btn-outline-info"  style={{ backgroundColor: '#DBBDE7', borderRadius: '10px'}}>
            <div className="row align-items-center  text-black " style={{ backgroundColor: '#DBBDE7', borderRadius: '10px' }}>
            <div className="d-flex flex-row col-4">
                <img className="img-fluid rounded-circle" style={{ width: '100px', height: '85px' }} src={GlobalVariables.apiUrl+item.profPicPath} alt="" />
                <span className="mt-2 ml-2" style={{marginLeft:'0.5rem'}}>{item.name}</span>
            </div>
            <div className="col-8">
                <div className="">
                    <div className="d-flex flex-column float-end col-8 w-50">
                        
                        <button className=" w-10 btn btn-primary btn-lg text-black" onClick={()=>{setDoctorId(item.uid)}} disabled={DoctorId!==0} style={{background:'#EDDDE4'}}>Select</button>
                        
                        
                    </div>
                    
                    {/* <span className="float-end">{`${formattedHours}:${formattedMinutes} ${ampm}`}</span> */}
                </div>
                </div>
            </div>
            </div>
            <hr />
        </div>
        )})}
        </div>}
                <div className="d-flex justify-content-end mt-2">
                  <Button className='btn btn-primary btn-lg text-black' style={{backgroundColor:'#DBBDE7'}} type="submit">
                    Register
                  </Button>
                </div>
                
              </Form>
            </Card.Body>
          </Card>
          {/* <p>{dataa}</p> */}
        </div>
      </div>
      
    </div>
  );
};

export default Signup;
