import React, { useState,useEffect } from 'react';
import { Form, Spinner,Button, Card } from 'react-bootstrap';
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from './Doctor/Globel';
import styled from 'styled-components';
const AddNewCollection = () => {
    const [formData, setFormData] = useState({
        uText: '',
        etext: '',
        type: '',
        group: '',
        audio: '',
        picture: null
      });
      const [selectedImage, setSelectedImage] = useState(null);
      const[reciveDataCheck,setReciveDataCheck]=useState({})
      const [audioFileName, setAudioFileName] = useState('');
      const [loading, setLoading] = useState(false);
      const[dataa,setData]=useState({})
      const navigate = useNavigate()
      const location=useLocation();
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
      // const handlePictureChange = (e) => {
      //   const files = Array.from(e.target.files); // Convert the FileList to an array
      //   setFormData({
      //     ...formData,
      //     pictures: files
      //   });
      const handleAudioChange = (e) => {
        setFormData({
          ...formData,
          audio: e.target.files[0]
        });
        const audioFile = e.target.files[0];
            if (audioFile) {
                setAudioFileName(audioFile.name);
            } else {
                setAudioFileName('');
            }
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
        setLoading(true);
        const Data = new FormData();
        Data.append('name', formData.name);
        Data.append('relation', formData.relation);
       
        if (formData.picture) {
          Data.append('personPic', formData.picture);
        }
      
        // Checking if caregiverId exists in reciveDataCheck
        
          Data.append("addBy", reciveDataCheck.uid);
          Data.append('age', formData.age);
          Data.append('gender', formData.gender);
          Data.append('audio', formData.audio);
          
        //   try {
        //     const response = await fetch(GlobalVariables.apiUrl + '/api/Person/UploadPersonData', {
        //       method: 'POST',
        //       headers: {
        //         Accept: 'application/json'
        //       },
        //       body: Data,
        //     });
        //     const data = await response.json();
        //     setData(data);
        //     console.log(data);
            
        //   } catch (error) {
        //     console.error('Error:', error);
        //   }finally {
        //     setLoading(false);
        // }
        
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
    <div><div className="text-white text-center fs-1" style={{ borderBottomRightRadius: '90%', height: 120, width: '100%', backgroundColor: "#AB91D9" }}>
    <div className=" p-5">Add Collection</div>
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
                    id="custom-image-file"
                    onChange={handlePictureChange}
                    //multiple
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
              <Form.Control type="text" placeholder="English Text" name="name" value={formData.etext} onChange={handleChange} required className="form-control-lg" />
            </Form.Group>

            <Form.Group controlId="formBasicName" className='mt-4'>
              <Form.Control type="text" placeholder="Urdu Text" name="relation" value={formData.utext} onChange={handleChange} required className="form-control-lg" />
            </Form.Group>

                <Form.Group controlId="formBasicName" className='mt-4'>
                  <Form.Control type="text" placeholder="Group" name="age" value={formData.group} onChange={handleChange} required className="form-control-lg" />
                </Form.Group> 
                <Form.Group controlId="formBasicDropdown" className='mt-4'>
                  <select className="form-control fs-5" name="type" onChange={handleDropdownChange} required>
                    <option value="">Select type</option>
                    <option value="a">Alphabets</option>
                    
                    <option value="w">Words</option>
                    <option value="s">Sentences</option>
                  </select>
                </Form.Group>
               
              
            

                <Form.Group controlId="formBasicAudio" className='mt-3'>
    <label htmlFor="custom-audio-file" className="btn btn-secondary">Choose Audio</label>
    <input 
        type="file" 
        id="custom-audio-file" 
        accept="audio/*" 
        onChange={handleAudioChange} 
        style={{ display: 'none' }} 
        required 
    />
     {audioFileName && <span className="ml-2">{audioFileName}</span>}
</Form.Group>
              {/* <div className="input-group">
               {selectedImage && <img className='mt-1' src={selectedImage} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} />}
            </div>
            </Form.Group> */}
           
            <div className="d-flex justify-content-end mt-2">
              <Button className='btn btn-primary btn-lg' type="submit" disabled={loading} style={{background:'#AB91D9'}}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Add'}
              </Button>
            </div>
            
          </Form>
        </Card.Body>
      </Card>
      {/* <p>{dataa}</p> */}
    </div>
  </div>
  </div>
  )
}
export default AddNewCollection

// import React, { useState } from 'react';

// const DropdownWithInput = () => {
//   const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [customOption, setCustomOption] = useState('');

//   const handleSelectChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleInputChange = (e) => {
//     setCustomOption(e.target.value);
//   };

//   const handleAddOption = () => {
//     if (customOption && !options.includes(customOption)) {
//       setOptions([...options, customOption]);
//       setSelectedOption(customOption);
//       setCustomOption('');
//     }
//   };

//   return (
//     <div>
//       <select value={selectedOption} onChange={handleSelectChange}>
//         <option value="" disabled>Select an option</option>
//         {options.map((option, index) => (
//           <option key={index} value={option}>{option}</option>
//         ))}
//       </select>
//       <input 
//         type="text" 
//         value={customOption} 
//         onChange={handleInputChange} 
//         placeholder="Enter custom option" 
//       />
//       <button onClick={handleAddOption}>Add Option</button>
//     </div>
//   );
// };

// export default DropdownWithInput;
