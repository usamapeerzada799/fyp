import React, { useState,useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from './Doctor/Globel';
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
  const[dataa,setData]=useState({})
  const navigate = useNavigate()
  const location=useLocation();
  useEffect(() => {
    try{
    const recivedata=location.state;
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
        const response = await fetch(GlobalVariables.apiUrl + '/api/User/CaregiverRegisterPatient', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: Data,
        });
        const data = await response.json();
        setData(data);
        console.log(data);
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
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  return (
    <div>
      <div className="text-white text-center fs-1" style={{ borderBottomRightRadius: '90%', height: 120, width: '100%', backgroundColor: "#003cb3" }}>
        <div className=" p-5">SignUp</div>
      </div>
      <div className="container-fluid h-100 d-flex justify-content-center align-items-center mt-1">
        <div className="col-md-6 rounded">
          <Card className="fs-5 " style={{ borderRadius: '10px' }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName" className='mt-4'>
                  <Form.Control type="text" placeholder="Enter your full name" name="name" value={formData.name} onChange={handleChange} required className="form-control-lg" />
                </Form.Group>

                <Form.Group controlId="formBasicUsername" className='mt-4'>
                  <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} required className="form-control-lg" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className='mt-4'>
                  <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required className="form-control-lg" />
                </Form.Group>

                <Form.Group controlId="formBasicDropdown" className='mt-4'>
                  <select className="form-control fs-5" name="type" onChange={handleDropdownChange} required>
                    <option value="">Select type</option>
                    <option value="Doctor">Doctor</option>
                    
                    <option value="Caregiver">Caregiver</option>
                  </select>
                </Form.Group>

                {reciveDataCheck && (
                  <>
                    <Form.Group controlId="formBasicAge" className='mt-4'>
                      <Form.Control type="number" placeholder="Enter your age" name="age" value={formData.age} onChange={handleChange} required className="form-control-lg" />
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

                <Form.Group controlId="formBasicPicture" className='mt-3'>
                 <label htmlFor="custom-file" className="btn btn-secondary">Choose Picture</label>
                    <input type="file" id="custom-file" accept="image/*" onChange={handlePictureChange} style={{ display: 'none' }} required />
                    
                  <div className="input-group">
                   {selectedImage && <img className='mt-1' src={selectedImage} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} />}
                </div>

                </Form.Group>
                <div className="d-flex justify-content-end mt-2">
                  <Button className='btn btn-primary btn-lg' type="submit">
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
