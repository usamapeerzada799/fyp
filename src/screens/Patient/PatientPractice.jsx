import {useLocation,useNavigate} from 'react-router-dom'
import React,{ useEffect,useState } from "react";
import GlobalVariables from '../Doctor/Globel';
import { FaVolumeUp } from "react-icons/fa";
const PatientPractice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [practices,setPractices]=useState([{Path:"",description:""}]);
    const[reciveDataCheck,setReciveDataCheck]=useState({})
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(()=>{
     const FeactData=async()=>{
     try {
        const recivedata=location.state;
        console.log(recivedata.pid);
        setReciveDataCheck(recivedata);
        const responce = await fetch(GlobalVariables.apiUrl+ `/api/Patient/AssignedPractic?pid=${recivedata.pid}&filter=one`);
        const data=await responce.json()
        setPractices(data.Collections);
        console.log(data.Collections)

        } catch (error) {
          console.log(error)
        }
     }
     FeactData()
    },[])
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % practices.length);
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + practices.length) % practices.length);
};
const playAudio = (audioUrl) => {
  const audio = new Audio(audioUrl);
  audio.play();
};
  const currentObject = practices[currentIndex];
  
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6 text-center">
            <img src={GlobalVariables.apiUrl + practices[currentIndex].Path} alt="Object Image"  className="img-fluid " style={{height: '250px'}}/>
            <h1>{practices[currentIndex].Etext}</h1>
            <button onClick={() => playAudio(GlobalVariables.apiUrl + practices[currentIndex].audioPath)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
            ><FaVolumeUp style={{ height: '80px', width: '40px' }}/></button> 
        </div>
    </div>
    <div className="row justify-content-center">
        <div className="col-md-6 text-center ">
            <button onClick={handlePrevious}  disabled={currentIndex === 0} className="btn btn-primary mr-2" style={{width:'150px'}}>Previous</button>
            <button onClick={handleNext}  disabled={currentIndex === practices.length - 1} className="btn btn-primary" style={{width:'150px',marginLeft:"5px"}}>Next</button>
        </div>
    </div>
</div>
  );
}
export default PatientPractice