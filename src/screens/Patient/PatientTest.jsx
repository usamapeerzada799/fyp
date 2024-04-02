import {useLocation,useNavigate} from 'react-router-dom'
import React,{ useEffect,useState } from "react";
import GlobalVariables from '../Doctor/Globel';
import { FaVolumeUp } from "react-icons/fa";
const PatientTest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [Test,setTest]=useState([{Path:"",description:""}]);
    const[reciveDataCheck,setReciveDataCheck]=useState({})
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    
    useEffect(()=>{
     const FeactData=async()=>{
     try {
        const recivedata=location.state;
        console.log(recivedata.pid);
        setReciveDataCheck(recivedata);
        const responce = await fetch(GlobalVariables.apiUrl+ `/api/Patient/AssignedTest?pid=${recivedata.pid}&filter=one`);
        const data=await responce.json()
        setTest(data.Collections);
        console.log(data.Collections)

       

        } catch (error) {
          console.log(error)
        }
     }
     FeactData()
    },[])
    useEffect(() => {
      // Shuffle the array of options once when the component mounts or when currentIndex changes
      const shuffledOptions = shuffleArray([
          
          { path: Test[currentIndex].Path, option: Test[currentIndex].CollectId ,audio:Test[currentIndex].collectAudio },
          { path: Test[currentIndex].Op1ImagePath, option: Test[currentIndex].Op1ImagePath,audio:Test[currentIndex].Op1Audio },
          { path: Test[currentIndex].Op2ImagePath, option: Test[currentIndex].Op2ImagePath, audio:Test[currentIndex].Op2Audio },
          { path: Test[currentIndex].Op3ImagePath, option: Test[currentIndex].Op3ImagePath ,audio:Test[currentIndex].Op3Audio }
      ]);
      setOptions(shuffledOptions);
  }, [currentIndex, Test]);
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Test.length);
    };
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + Test.length) % Test.length);
    };
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  const handleOptionChange = (event, option) => {
    const updatedSelectedOptions = { ...selectedOptions };
    updatedSelectedOptions[currentIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
};
const playAudio = (audioUrl) => {
  const audio = new Audio(audioUrl);
  audio.play();
};
  return (
    <div>
        <div className="col-lg-6 col-md-6 col-sm-6 mt-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title fs-5" style={{ marginLeft: '0.59rem' }}>{Test[currentIndex].questionTitle}</h5>
                    <div className="row">
                    <h2>{Test[currentIndex].Question}</h2>
                    {options.map((item, imageIndex) => (
                                <div key={imageIndex} className="col-6 mt-4">
                                     
                                    <input type="radio" id={`option${imageIndex}`} name="options" value={item.option} checked={selectedOptions[currentIndex] === item.option} onChange={(event) => handleOptionChange(event, item.option)} />
                                    <button onClick={() => playAudio(GlobalVariables.apiUrl + item.audio)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                                    ><FaVolumeUp style={{ height: '60px', width: '20px' }}/></button>
                                    <label htmlFor={`option${imageIndex}`}>
                                    
                                        <img src={GlobalVariables.apiUrl + item.path} className="img-fluid " alt="Image" style={{ height: '106px', objectFit: 'cover',marginLeft:'5px' }} />
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-6 text-center ">
        <button onClick={handlePrevious}  disabled={currentIndex === 0} className="btn btn-primary mr-2" style={{width:'150px'}}>Previous</button>
        <button onClick={handleNext}  disabled={currentIndex === Test.length - 1} className="btn btn-primary" style={{width:'150px',marginLeft:"5px"}}>Next</button>
    </div>
    </div>
  )
}
export default PatientTest