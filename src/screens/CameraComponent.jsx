import React, { useRef, useState, useEffect,useCallback } from 'react';
import GlobalVariables from './Doctor/Globel';
import Webcam from 'react-webcam'
import { FaVolumeUp } from "react-icons/fa";

import '../App.css';
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
const CameraComponent = () => {
    const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [data,setData]=useState({})
  const webcamRef = useRef(null);
  const [currentIndex,setCurrentIndex]=useState(0)

  const capture = useCallback(
    () => {
      const fetchapi=async()=>{
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc)
      // Convert base64 to blob
      const base64ToBlob = (base64, mimeType) => {
        const byteString = atob(base64.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeType });
      };

      const blob = base64ToBlob(imageSrc, 'image/png');

      const Data = new FormData();
      Data.append('personPic', blob);
      try{
      const response = await fetch(GlobalVariables.apiUrl+ '/api/Person/Upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: Data,
      });
      if(response.status==200){
        const json = await response.json();
        setData(json)
        console.log(json);
      }
      else {
        alert("An error occure")
        setImage(null)
      }
    }catch(error)
    {
      alert(error)
      setImage(null)
    }
      }
      
      fetchapi();
    },
    [webcamRef]
  );
  

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const takePicture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataURL = canvasRef.current.toDataURL('image/png');
    console.log(dataURL)
    setImage(dataURL);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.Sentence.length);
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data?.Sentence.length) % data?.Sentence.length);
  };

  return (
    <div>
     {!image && <div style={{ display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw', 
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'}}><Webcam
        audio={false}
        height={'100%'}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={'95%'}
        videoConstraints={videoConstraints}
        style={{ 
          width: '100vw', 
          height: '100vh',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      <div className="container" style={{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
     /* or any specific width */
  }}>
   <button 
        onClick={capture} 
        style={{ 
          backgroundColor: 'Pink',
          border: 'none',
          outline: 'none',
          borderRadius: '50%',
          width: '70px',
          height: '70px',
          position: 'absolute',
          bottom: '20px', // Adjust as needed for spacing from bottom
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1 // Ensure the button is above the webcam
        }}
      >
        Capture photo
      </button>
</div>
      {/* <button onClick={capture} style={{
    backgroundColor: 'Pink',
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px'
  }}
>Capture photo</button> */}
      </div>
     }
    
  
      {(data?.person?.audioPath && data!="null") &&(
        <div>
          <img src={GlobalVariables.apiUrl + data?.person?.profilePicPath} style={{height:'28rem',width:'24rem'}} alt="captured photo"/>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <h1>{data?.person?.name}</h1>
            <button
              onClick={() => playAudio(GlobalVariables.apiUrl + data?.person?.audioPath)}
              style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '10px' }}
            >
              <FaVolumeUp style={{ height: '30px', width: '40px' }} />
            </button>
          </div>
          <div className="col-md-6 text-center mt-5">
            <h4>{data?.Sentence[currentIndex]}</h4>

          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 text-center ">
                <button onClick={handlePrevious}  disabled={currentIndex === 0} className="btn btn-primary mr-2" style={{width:'150px'}}>Previous</button>
                <button onClick={handleNext}  disabled={currentIndex === data?.Sentence.length - 1} className="btn btn-primary" style={{width:'150px',marginLeft:"5px"}}>Next</button>
            </div>
        </div>
        </div>
      )}
    </div>
  );


  
}
export default CameraComponent