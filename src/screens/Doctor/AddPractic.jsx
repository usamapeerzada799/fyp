import { useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../../css/Doctor/AddPractic.scss'
import GlobalVariables from './Globel'
const AddPractic = () => {
    const[data,setData]=useState([])
    const [selectedOption, setSelectedOption] = useState('a');
    const [selectStage, setSelectStage] = useState('select stage');
    const [checkedItems, setCheckedItems] = useState({});
    const [collectionData,setCollectionData]=useState([]);
    const [newPraticData,setNewPracticData]=useState({});
    const [title,setTitle]=useState('')
    const   navigate=useNavigate()
    useEffect(()=>{
        const fetchDAta = async()=>
        {
           try{
            const responce = await fetch(GlobalVariables.apiUrl+"/api/Collection/GetAllCollection");
            const data=await responce.json();
            console.log(data);
            setData(data);
            
           }catch(e){console.log(e)}
        }
        fetchDAta()
      },[])  
      useEffect(()=>{
        console.log(checkedItems)
        console.log(collectionData)
      },[checkedItems,collectionData]);  
      const handleCheckboxChange = (event, itemId) => {
        setCheckedItems(prevCheckedItems => {
            // If the checkbox is checked, add the item to checkedItems
            if (event.target.checked) {
                
                return { ...prevCheckedItems, [itemId]: true };
                
            } else {
                // If the checkbox is unchecked, remove the item from checkedItems

                const { [itemId]: removedItem, ...rest } = prevCheckedItems;
                return rest;
            }
        });     
        console.log(checkedItems)
        setCollectionData(prevIds => {
            if (event.target.checked) {
                // If checkbox is checked, add the item ID to the array
                return [...prevIds, { collectid:itemId }];
            } else {
                // If checkbox is unchecked, filter out the item ID from the array
                return prevIds.filter(idObj => idObj.collectid !== itemId);
            }
        });
        console.log(collectionData)
    };

    const newprac =async()=>{
       if(title && selectStage && collectionData){
           try{
            const dataa={practice:{stage:selectStage,title:title,createBy:4},collections:collectionData};
            console.log(dataa);
        
            const responce=await fetch(GlobalVariables.apiUrl+"/api/Practice/AddNewPractice",
            {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    
                },
                body:JSON.stringify(dataa),
            }
            
            );
            const res=await responce.json();
            console.log(res)
            navigate('/Practice', { state: data })
        }catch {
            console.log("data not save")
        }
        }
        else{
            console.log("incomplete data")
        }
    }

  return (
    <div className="Container">
       <span>AddPractic</span>
       <div className="top" >
        <div className="inputfield"> <input type="text" placeholder="Enter Practic Title" onChange={(e)=>setTitle(e.target.value)}/></div>
        <div className="dropdown" >
            <select  value={selectStage} onChange={(e)=>{setSelectStage(e.target.value)}}>
                
                <option value="select stage">Select Stage</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                
            </select>
        </div>
        <div className="dropdown">
            <select value={selectedOption} onChange={(e)=>{setSelectedOption(e.target.value)}}>
                
                <option value="a">Alphabets</option>
                <option value="w">words</option>
                <option value="s">sentences</option>
            </select>
        </div>
      </div>
      <div className="grid-container">
                {data.map((item, index) => {
                    // Filtering based on selected option
                    if (item.type === selectedOption) {
                        return( 
                            <div key={index} className="collections">
                               <img src={GlobalVariables.apiUrl+item.picPath}></img>
                               <div className="text-content">
                               <h4>{item.eText}</h4>
                               <input
                                    type="checkbox"
                                    checked={checkedItems[item.id] || false} // Check if item is checked
                                    onChange={(e) => handleCheckboxChange(e, item.id)}
                                />
                                </div>
                            </div>
                        ); 
                    } else {
                        return null; 
                    }
                })}
            </div>
            <div>
                
                <button onClick={newprac}>
                <span>ADD new Practice</span>
                </button>
                
            </div>
    </div>

  )
}
export default AddPractic