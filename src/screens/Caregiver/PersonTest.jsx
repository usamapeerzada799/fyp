import { useEffect,useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import GlobalVariables from '../Doctor/Globel';
import Store from '../Store';
const PersonTest = () => {
  const navigate = useNavigate();
  const location = useLocation();  
  let receivedData=''
  const [reciveDataCheck,setReciveDataCheck]=useState({});
  const [singleTesttData,setSingleTestData]=useState([{EText:""}]);
  const [data,setData]=useState([]);
  const [testTitle,SetTestTitle]=useState([]);
  const[AppointmentPersonTests,setAppointmentPersonTests]=useState([]);
  useEffect(()=>{
    receivedData = location.state;
    console.log(receivedData)
    setReciveDataCheck(receivedData);
   if(receivedData?.reciveDataCheck){
    receivedData=receivedData.reciveDataCheck;
    console.log(receivedData)
   }
    const fetchData=async()=>{
      try{
        let patientId = receivedData.patientId ? receivedData.patientId : 0;
        const responce=await fetch(GlobalVariables.apiUrl+`/api/Person/GetPersonTest?Uid=${receivedData.userId}`)
        const data=await responce.json();
        console.log(data);
        console.log(data);
        setData(data);
        const uniqueItems = data.filter((item, index) =>{ 
          const firstIndex= data.findIndex(obj => obj.Title === item.Title) === index;
        if (firstIndex) {
          // Add your additional properties here
          item.togleSign = ">";
          item.toggle = true;
        }
        return firstIndex;
      });
      console.log(uniqueItems)
      SetTestTitle(uniqueItems)
    }catch(e){console.log(e)}
    }
    fetchData()
  },[])
  useEffect(()=>{
    console.log(reciveDataCheck);console.log(AppointmentPersonTests)
  },[testTitle,reciveDataCheck,AppointmentPersonTests]);

  const singleTestData=(e,ind)=>{
    
    if(e.toggle){ 
    const pracdata = data.filter((a)=>{
        if(a.Title===e.Title){
        return e;
        }
      })
      
      setSingleTestData(pracdata);
      SetTestTitle(testTitle.map((item, index) => 
      
      {
        if (index === ind) {
            return { ...item, togleSign: "v", toggle: false };
        } else {
          return { ...item, togleSign: ">", toggle: true };
        }
    }));
     
    }
    else{
      setSingleTestData('')
      SetTestTitle(testTitle.map((item, index) => {
        if (index === ind) {
            return { ...item, togleSign: ">", toggle: true };
        } else {
            return item;
        }
    }));
     
    }
   }
  const shuffleArray=(array)=> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const handleCheckboxChange = (e, personTestId) => {
    const { checked } = e.target;

    setAppointmentPersonTests(prevState => {
      const index = prevState.findIndex(item => item.personTestId === personTestId);

      if (checked) {
        // If checked, insert the object next to the current index
        const updatedState = [...prevState];
        updatedState.splice(index + 1, 0, { personTestId });
        return updatedState;
      } else {
        // If unchecked, remove the object with matching pracId
        return prevState.filter(item => item.personTestId !== personTestId);
      }
    });
    //   if (checked) {
    //     // If checked, update pracId for the given index
    //     const updatedState = [...prevState];
    //     updatedState[index] = { ...updatedState[index], testId: testId }; // Assuming e.pracId is the pracId to add
    //     return updatedState;
    //   } else {
    //     // If unchecked, remove the object at the given index
    //     return prevState.filter((item, i) => i !== index);
    //   }
    // });
  };
  const submitHandler=()=>{
    try{
    Store.dispatch({
      type: 'ADD_OBJECT',
      payload: {
        collectionName: 'objects4',
        object: {AppointmentPersonTests}
      }
    });
    navigate('/AddNewAppointment',{state:reciveDataCheck})
   }catch(e){console.log(e)}
  }
  return (
    <div className="container">
        <span className="fs-3 d-block text-center fw-bold">
          Test
        </span>
        
        {testTitle.map((e,index)=>{
        return(
          <div key={index}>
          <div className="row align-items-center m-1 text-light" style={{ backgroundColor: '#0DB495', borderRadius: '10px'}}>
            <div className="col">
              {(reciveDataCheck?.patientId ) &&   
                <div className="col-1">
                  <input
                type="checkbox"
                className="form-check-input"
                 // Check if item is checked
                 onChange={(a) => handleCheckboxChange(a, e.TestId)}
              />
                </div >
                
                }
              <h3 className={`${e.flag ?'text-success' : 'text-light' } d-inline p-2 fs-5`}>{e.Title}</h3>
              <hr/>
            </div>
            <div className="col-auto">
              <button className="btn btn-light" onClick={() => singleTestData(e, index)}>{e.togleSign}</button>
            </div>
          </div>

          {singleTesttData && singleTesttData.some(item => item.Title === e.Title) && (
          <div className="">
              <div className="row">
                  {singleTesttData.map((item, index) => {
                      // Create an array with the image paths
                      const imagePaths = [
                          GlobalVariables.apiUrl + item.PicPath,
                          GlobalVariables.apiUrl + item.Op1ImagePath,
                          GlobalVariables.apiUrl + item.Op2ImagePath,
                          GlobalVariables.apiUrl + item.Op3ImagePath
                      ];
                      // Shuffle the array
                      const shuffledImagePaths = shuffleArray(imagePaths);
                      // Render the shuffled images
                      return (
                        <div key={index} className="col-lg-6 col-md-6 col-sm-6 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fs-5" style={{ marginLeft: '0.59rem' }}>{item.QuestionTitle}</h5>
                                <div className="row">
                                    {shuffledImagePaths.map((imagePath, imageIndex) => (
                                        <div key={imageIndex} className="col-6 mt-4">
                                            <img src={imagePath} className="img-fluid" alt="Image" style={{ height: '150px', objectFit: 'cover' }}/>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                      );
                  })}
              </div>
          </div>
      )}
      </div>
      )})}
        <div className="BtnAddpractic">
          
          <button className="btn btn-primary" onClick={()=>{navigate('/AddPersonTest',{state:reciveDataCheck})}}>
            ADD new Test
          </button>
          {(reciveDataCheck?.patientId ) &&
          <button className="btn btn-primary" style={{marginLeft:'0.5rem'}} onClick={()=>submitHandler()}>
          ADD to Appointment
          </button>
          }
        </div>
       
    </div>
  )
}
export default PersonTest