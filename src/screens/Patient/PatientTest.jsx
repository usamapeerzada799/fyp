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
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [DosctorSelectedOptions, setDoctorSelectedOptions] = useState([]);
    const [CaregiverSelectedOptions, setCaregiverSelectedOptions] = useState([]);
    const [DoctorAssignDataLength, setDoctorAssignDataLength] = useState([]);
    const [CaregiverAssignDataLength, setAssignDataLength] = useState([]);
    const [dataLenght,setDatalength]=useState()
    const [indexForSelection,setIndexForSelection]=useState(0)
    const [DoctorAppointId,setDoctorAppointId]=useState(0)
    const [CaregiverAppointId,setCaregiverAppointId]=useState(0)
    let data=[]
    
    
    let AppointmentId=0
    useEffect(()=>{
     const FeactData=async()=>{
     try {
        const recivedata=location.state;
        console.log(recivedata.pid);
        setReciveDataCheck(recivedata);
        const responce = await fetch(GlobalVariables.apiUrl+ `/api/Patient/AssignedTest?pid=${recivedata.pid}&filter=one`);
         data=await responce.json()
        setDatalength(data.length)
        console.log(data)
        if(data.length>0){
        if(data.length>1){
          if(data[0].Collections[0].Usertype == "doctor"){
            
            setDoctorAppointId(data[0].Collections[0].AppointmentId)
            setCaregiverAppointId(data[1].Collections[0].AppointmentId);
          }
          else{
            setDoctorAppointId(data[1].Collections[0].AppointmentId);
            setCaregiverAppointId(data[0].Collections[0].AppointmentId);
          } 
          console.log(data[1].UserType)
         
        const combinedArray = [...data[0]?.Collections,...data[1]?.Collections];
        setTest(combinedArray);
        }
        else{
          AppointmentId=data[0].Collections[0].AppointmentId;
          setTest(data[0]?.Collections);
        }
       // setPractices(...practices,data[1]?.Collections);
       
       
      }else{
       alert("not any Test assiged")
      }
        } catch (error) {
          console.log(error)
        }
     }
     FeactData()
    },[])
    useEffect(() => {
      // Shuffle the array of options once when the component mounts or when currentIndex changes
      if(Test){
      const shuffledOptions = shuffleArray([
          
          { path: Test[currentIndex].Path, option: Test[currentIndex].CollectId ,audio:Test[currentIndex].collectAudio,Usertype:Test[currentIndex].UserType },
          { path: Test[currentIndex].Op1ImagePath, option: Test[currentIndex].Opt1,audio:Test[currentIndex].Op1Audio,Usertype:Test[currentIndex].UserType },
          { path: Test[currentIndex].Op2ImagePath, option: Test[currentIndex].Opt2, audio:Test[currentIndex].Op2Audio,Usertype:Test[currentIndex].UserType },
          { path: Test[currentIndex].Op3ImagePath, option: Test[currentIndex].Opt3,audio:Test[currentIndex].Op3Audio,Usertype:Test[currentIndex].UserType }
      ]);
      
      setOptions(shuffledOptions);
    }
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
  const handleOptionChange = (event, option, userType) => {
    let updatedSelectedOptions = [];
    
    if (dataLenght > 1) {
      if (userType === "doctor") {
        updatedSelectedOptions = [...DosctorSelectedOptions];
        updatedSelectedOptions[currentIndex] = option;
        console.log('DoctorSelectedOptions:', updatedSelectedOptions);
        setDoctorSelectedOptions(updatedSelectedOptions);
      } else if (userType === "Caregiver") {
        updatedSelectedOptions = [...CaregiverSelectedOptions];
        updatedSelectedOptions[currentIndex] = option;
        console.log('CaregiverSelectedOptions:', updatedSelectedOptions);
        setCaregiverSelectedOptions(updatedSelectedOptions);
      }
    } else {
      updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[currentIndex] = option;
      console.log('SelectedOptions:', updatedSelectedOptions);
      setSelectedOptions(updatedSelectedOptions);
    }
  };
  const isChecked = (item) => {
    if (item.Usertype === "doctor") {
      return DosctorSelectedOptions[currentIndex] === item.option;
    } else if (item.Usertype === "Caregiver") {
      return CaregiverSelectedOptions[currentIndex] === item.option;
    } else {
      return selectedOptions[currentIndex] === item.option;
    }
  };
const playAudio = (audioUrl) => {
  const audio = new Audio(audioUrl);
  audio.play();
};
  const SubmitTest=async()=>{
    console.log(DoctorAppointId)
    if(dataLenght>1){
      const filteredDoctorArray = DosctorSelectedOptions.filter(element => element !== undefined);
      console.log(filteredDoctorArray);
      const filteredCaregiverArray = CaregiverSelectedOptions.filter(element => element !== undefined);
      console.log(filteredCaregiverArray);
      let ComputeTestData=[]
        ComputeTestData=[{SelectedOptions:filteredDoctorArray,AppointmentId:DoctorAppointId,Pid:reciveDataCheck.pid},
          {SelectedOptions:filteredCaregiverArray,AppointmentId:CaregiverAppointId,Pid:reciveDataCheck.pid}]
       const responce=await postFunc(ComputeTestData)
    }
  }
  const postFunc=async(data)=>{
    console.log(data)
    try {
      
      const responce = await fetch(GlobalVariables.apiUrl + "/api/Patient/TestComputation",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(data),
        }

      );
      const res = await responce.json();
      alert(res)
      
    } catch {
      console.log("data not save")
    }
  }
  return (
    <div>
    {Test &&
    <div className="align-items-center" style={{ height: '100vh' }}>
        <div className="col-lg-6 col-md-6 col-sm-6 mt-3 mx-auto">
            <div className="card ">
                <div className="card-body item-center">
                    <h5 className="card-title fs-5" style={{ marginLeft: '0.59rem' }}>{Test[currentIndex].questionTitle}</h5>
                    <div className="row">
                    <h2>{Test[currentIndex].Question}</h2>
                    {options.map((item, imageIndex) => (
                                <div key={imageIndex} className="col-6 mt-4">
                                    {!reciveDataCheck.uid &&  
                                    <input type="radio" id={`option${imageIndex}`} name="options" value={item.option} checked={isChecked(item)} onChange={(event) => handleOptionChange(event, item.option,item.Usertype)} />}
                                    <button onClick={() => playAudio(GlobalVariables.apiUrl + item.audio)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                                    ><FaVolumeUp style={{ height: '60px', width: '20px' }}/></button>
                                    <label htmlFor={`option${imageIndex}`}>
                                    
                                        <img src={GlobalVariables.apiUrl + item.path} className="img-fluid " alt="Image" style={{ height: '106px' ,objectFit: 'cover',marginLeft:'5px' }} />
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-6 text-center ">
        <button onClick={handlePrevious}  disabled={currentIndex === 0} className="btn btn-primary mr-2 mt-2" style={{width:'150px'}}>Previous</button>
        <button onClick={handleNext}  disabled={currentIndex === Test.length - 1} className="btn btn-primary mt-2" style={{width:'150px',marginLeft:"5px"}}>Next</button>
        {(currentIndex === Test.length - 1)&&
        <button onClick={SubmitTest}   className="btn btn-primary mt-2" style={{width:'150px',marginLeft:"5px"}}>Submit</button>
        }
    </div>
    </div>}
    </div>
  )
}
export default PatientTest