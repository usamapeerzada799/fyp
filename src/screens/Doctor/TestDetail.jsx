import { useEffect,useState } from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
const TestDetail = () => {
  const [alphabets,setAlphabets]=useState([]);
  const [words ,setWords]=useState([])
  const [sentences,setSentences]=useState([]);
  const [TestDetail,setTestDetail]=useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [reciveDataCheck, setReciveDataCheck] = useState({})
  useEffect(()=>{
    let receivedData = location.state.testData;
    
    console.log(receivedData)
    const word=receivedData.filter(item=> item.type==='w')
    setWords(word);
    
    const alpha=receivedData.filter(item=> item.type==='a')
    setAlphabets(alpha);

    const senten=receivedData.filter(item=> item.type==='s')
    setSentences(senten);
    receivedData=location.state.recvData;
    console.log(receivedData)
    setReciveDataCheck(receivedData)
  },[])
  
  return (
    <div className="container align-items-center justify-content-center ">
       <div className="container text-center mt-5" style={{width: "70%",height:'50%'}}>
          <span className='d-block p-2   mt-5 text-warning fw-bold' style={{fontSize:38}}>Test Details</span>
        </div>
      <div className='mt-4 '>
    {alphabets.length > 0 &&  
      <div className='d-block p-3 mb-2 bg-danger-subtle text-black rounded'>Albhabet
        <div>
        {alphabets.map((e)=>{return (<div className='d-inline'>{e.eText}</div>)})}
        </div> </div>}
      {words.length >0 &&
      <div className='d-block p-3 mb-2 bg-secondary-subtle fs-3 text-black rounded'>words
      <div> 
      {words.map((e,index)=>{return (<div key={index} className={`${e.feedback ?'text-black' : 'text-danger' } d-inline p-2 fs-5`}>{e.eText}</div>)})}
      
      </div></div>}
      {sentences.length >0 &&
      <div className='d-block p-3 mb-2 bg-secondary-subtle  text-black rounded'>sentences
        <div>
        {sentences.map((e,index)=>{return (<div key={index} className='d-inline p-2 '>{e.eText}</div>)})}
        </div>
      </div>}
      <div className="row justify-content-center">
        <div className="col-auto mb-3 mt-3">
          <button className="btn btn-primary btn-lg" onClick={()=>{navigate('/AppointmentDetails',{state:reciveDataCheck})}}>Add New Appointment</button>
        </div>
      </div>
    </div>
    </div>
  )
}
export default TestDetail