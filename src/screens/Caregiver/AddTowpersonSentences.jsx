import React, { useState,useEffect } from 'react';
import { Form, Spinner,Button, Card } from 'react-bootstrap';
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from '../Doctor/Globel';
import styled from 'styled-components';
const AddTowpersonSentences = () => {
  const [formData, setFormData] = useState({
    name: '',
   
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const[reciveDataCheck,setReciveDataCheck]=useState({})
  const [audioFileName, setAudioFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const[dataa,setData]=useState({})
  const navigate = useNavigate()
  const location=useLocation();
  useEffect(() => {
    try{
    const recivedata=location.state;
    console.log(recivedata)
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

  
  
  
    

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const Data = new FormData();
    Data.append('sentence', formData.name);
    
      try {
        const response = await fetch(GlobalVariables.apiUrl + '/api/User/AddSentence', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: Data,
        });
        const data = await response.json();
        setData(data);
        formData.name="";
        alert(data)
        
      } catch (error) {
        console.error('Error:', error);
      }finally {
        setLoading(false);
    }
    
  };
  
  return (
    <div><div className="text-white text-center fs-1" style={{ borderBottomRightRadius: '90%', height: 120, width: '100%', backgroundColor: "#AB91D9" }}>
    <div className=" p-5">Add Person</div>
  </div>
  <div className="container-fluid h-100 d-flex justify-content-center align-items-center mt-1">
    <div className="col-md-8 rounded">
      <Card className="fs-5 " style={{ borderRadius: '10px' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          
            <Form.Group controlId="formBasicName" className='mt-6 '>
            <h4>Enter Sentence</h4>
              <Form.Control type="text" placeholder="eg. i like [Name1] and [Name2]" name="name" value={formData.name} onChange={handleChange} required className="form-control-lg" />
            </Form.Group>

          
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
export default AddTowpersonSentences