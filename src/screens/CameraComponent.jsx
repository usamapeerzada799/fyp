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

      const response = await fetch(GlobalVariables.apiUrl+ '/api/Person/Upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: Data,
      });
     const json = await response.json();
     setData(json)
     console.log(json);
      
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

  return (
    <div>
     {!image && <div style={{display:'flex',flexDirection:'column'}}><Webcam
        audio={false}
        height={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={'100%'}
        videoConstraints={videoConstraints}
      />
      <div className="container" style={{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', /* or any specific height */
    width: '100vw', /* or any specific width */
  }}>
  <button onClick={capture} style={{ backgroundColor: 'Pink',
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    width: '70px',
    height: '70px' }}>
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
    
  
      {(data?.audioPath && data!="null") &&(
        <div>
          <img src={GlobalVariables.apiUrl + data?.profilePicPath} style={{height:'28rem',width:'24rem'}} alt="captured photo"/>
          <h1>{data?.name}</h1>
          <button onClick={() => playAudio(GlobalVariables.apiUrl + data?.audioPath)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
          ><FaVolumeUp style={{ height: '60px', width: '20px' }}/></button>
        </div>
      )}
    </div>
  );


  
}
export default CameraComponent