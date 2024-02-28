import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/Doctor/Practice.scss'
import GlobalVariables from './Globel'
const Practice = () => {
  const [data,setData]=useState([]);
  const [pracTitle,SetpracTitle]=useState([]);
  const [singlePracticData,setSinglePractData]=useState([{eText:""}]);
  const [toggle,settoggle]=useState(true)
  const [toglersign,setToglersign]=useState('>')
  
  useEffect(()=>{
    const fetchDAta = async()=>
    {
       try{ 
        const responce = await fetch(GlobalVariables.apiUrl+"/api/Practice/userDefindPractices?Uid=4");
        const data=await responce.json();
        console.log(data);
        setData(data)
        const uniqueItems = data.filter((item, index) => 
        data.findIndex(obj => obj.title === item.title) === index
        );
        SetpracTitle(uniqueItems)
        
 
       
       }catch(e){console.log(e)}
    }
    fetchDAta()
  },[])    
   const singlePracData=(title)=>{
    if(toggle){ 
    const pracdata = data.filter((e)=>{
        if(e.title===title){
          console.log(e.eText);
        return e;
        }
      })
      
      setSinglePractData(pracdata);
      settoggle(false)
      setToglersign('v')
    }
    else{
      setSinglePractData('')
      settoggle(true)
      setToglersign('>')
    }
   }
  return (
    <div className="Practice">
        <span>
            Practice
        </span>
        
        {pracTitle.map((e,index)=>{
        return(
          <div key={index}>
          <div className="itrate" key={index}>
            <h3>{e.title}</h3>
            <hr/>
            <button onClick={()=>singlePracData(e.title)}>{toglersign}</button>
            </div>
            {singlePracticData && singlePracticData.some(item => item.title === e.title) && (
            <div className="grid-container">
              {singlePracticData.map((item,index) => (
                <div key={index} className="togleData">
                  <img src={GlobalVariables.apiUrl+item.picPath}></img>
                  <h4>{item.eText}</h4>
                </div>
              ))}
            </div>
          )}
            
            
          </div>
            
          )
        })}
        <div className="BtnAddpractic">
          <Link to='/Addpractice'>
          <button >
            ADD new Practice
          </button>
          </Link>
        </div>
       
    </div>
  )
}
export default Practice