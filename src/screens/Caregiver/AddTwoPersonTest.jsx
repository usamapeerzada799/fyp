
import { useEffect, useState } from "react"
import GlobalVariables from "../Doctor/Globel";
import Modal from "react-modal";
import {useLocation,useNavigate} from 'react-router-dom'
const AddTwoPersonTest = () => {
    const [selectedOption, setSelectedOption] = useState('a');
    const [selectStage, setSelectStage] = useState('select stage');
    const [title, setTitle] = useState('')
    const [data, setData] = useState([])
    const [collectionData, setCollectionData] = useState([]);
    const [testData,setTestData]=useState([])
    const[testQuestonTitle,setTestQuestionTitle]=useState('');
    const [model1,setModel1]=useState(false)
    const [model2,setModel2]=useState(false)
    const [testCollectionData,setTestCollectionData]=useState([])
    const [checkedItems, setCheckedItems] = useState({});
    const [reciveDataCheck,setReciveDataCheck]=useState({})
    Modal.setAppElement('#root'); 
    const navigate = useNavigate();
    const location = useLocation();
    let receivedData=''  
  useEffect(()=>{console.log(testData);},[testData,testCollectionData])
    useEffect(() => {
      receivedData = location.state;
      console.log(receivedData)
      setReciveDataCheck(receivedData);
        const fetchDAta = async () => {
          try {
            const responce = await fetch(GlobalVariables.apiUrl + `/api/Person/GetPersons?cid=${receivedData.userId}`);
            const data = await responce.json();
            console.log(data);
            setData(data);
            const groupedItems = data.reduce((groups, item) => {
              const { relation } = item;
              if (!groups[relation]) {
                groups[relation] = [];
              }
              groups[relation].push(item);
              return groups;
            }, {});
            console.log(groupedItems)
            setCollectionData(groupedItems)
          } catch (e) { console.log(e) }
        }
        fetchDAta()
      }, [])
     
      const handleCheckboxChange = (event,itemId,eText) => {
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
        setTestCollectionData(prevIds => {
          if (event.target.checked) {
            // If checkbox is checked, add the item ID to the array
            return [...prevIds, { collectid: itemId,eText:eText }];
          } else {
            // If checkbox is unchecked, filter out the item ID from the array
            return prevIds.filter(idObj => idObj.collectid !== itemId);
          }
        });
        console.log(testCollectionData)
      };
      const Model1Check=()=>{
        if(testCollectionData.length<8){
          alert('select  at least 8 items for options!')
        }
        else{

         if (testQuestonTitle.trim() !== '') {
            const testCollData={...testCollectionData,questionTitle:testQuestonTitle}
            setTestData([...testData,  testCollData]);
            // Clear the testQuestionTitle after adding
            setTestQuestionTitle('');
            setModel1(false)
            setCheckedItems({})
            setTestCollectionData([ ])
          }
          else{
            alert('Enter question title')
          }
        }
      }
      const AddTest = async () => {
        console.log("clicked");
        try {
          if(testData.length>0){
            const CollectData = testData.map((e) => {
                return {
                    questionTitle:e.questionTitle,
                    personId1: e[0].collectid,
                    personId2: e[1].collectid,
                    op1: e[2].collectid,
                    op2: e[3].collectid,
                    op3: e[4].collectid,
                    op4: e[5].collectid,
                    op5: e[6].collectid,
                    op6: e[7].collectid,

                };
            });
            
            const tst = { createdBy: reciveDataCheck.userId, patientId:reciveDataCheck.pid, title: title };
            const sendTestData = { Test: tst, Persons: CollectData };
            console.log(sendTestData)
            const response = await fetch(GlobalVariables.apiUrl + "/api/Person/AddTwoPersonTest", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendTestData),
            });
    
            const res = await response.json();
            console.log(res);
          }
          else{
            alert("enter test data")
          }
        } catch (err) {
            console.log(err);
        }
    };
    
      // const customStyles = {
      //   content: {
      //     top: "50%",
      //     left: "50%",
      //     right: "auto",
      //     bottom: "auto",
      //     marginRight: "-50%",
      //     transform: "translate(-50%, -50%)",
      //     backgroundColor: "white",
      //     width: 400,
      //   },
      // };
      const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor: "white",
          transform: 'translate(-50%, -50%)',
          maxHeight: '80vh', // Set max height for the modal
          overflowY: 'auto'  // Enable vertical scrolling
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
      };
      
  return (
    
    <div>
      <div className="text-white text-center fs-1" style={{borderBottomLeftRadius:'90%' ,height:150,width:'100%',backgroundColor:"#AB91D9",}}>
        <div className=" p-5">Create Two Persons Test</div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter Test Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        
        
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success "
          type="button"
          onClick={()=>setModel2(true)}
          style={{marginRight:'20px'}}
          >+</button>
        
      </div> 
     <div>
      
     </div>
    <Modal
        isOpen={model1}
        onRequestClose={() => setModel1(false)}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
         <div className="col-md-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control"
             placeholder={`Enter question`}  
             onChange={(e)=>setTestQuestionTitle(e.target.value)} 
             //onKeyPress={handleKeyPress}

             />
          </div>
        </div>
      {Object.entries(collectionData)
      
      .map(([group, items]) => (
        <div key={group}>
          <h2>{group}</h2>
          <div className="row">
            {items.map((item, index) => {
             
                return (
                  <div key={index} className="col-md-3 col-4">
                    <div className="card mb-3 col-md-4 AddPrac" >
                      <img src={GlobalVariables.apiUrl + item.picPath} alt="Practice Image" />
                      <div className="card-body d-flex align-items-center">
                        <div className="col">
                          <input
                            type="checkbox"
                            className="form-check-input"
                             checked={checkedItems[item.id] || false} // Check if item is checked
                             onChange={(e) => handleCheckboxChange(e, item.id,item.name)}
                          />
                        </div>

                        <div className="col-11">
                          <h5 className="card-title">{item.name}</h5>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              
            })}
          </div>
        </div>
      ))}

        <button className="btn btn-success"
        onClick={Model1Check}>ok</button>
      </Modal>
      <Modal
        isOpen={model2}
        onRequestClose={() => setModel2(false)}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        
        <h2>1.Enter question</h2>
        <h2>2.Select 1st right option</h2>
        <h2>2.Select 2nd right option</h2>
        <h2>3.Select other 6 option</h2>
        <button className="btn btn-success"
        onClick={()=>{setModel2(false);setModel1(true)}}>ok</button>
      </Modal>
      {testData && 
      testData.map((e,index)=>{
        return(
         
            <div className="container mt-2"  key={index}>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{e.questionTitle}</h5>
                      <span className="card-text mx-2">{e[0].eText}</span>
                      <span className="card-text mx-2">{e[1].eText}</span>
                      <span className="card-text mx-2">{e[2].eText}</span>
                      <span className="card-text ml-2">{e[3].eText}</span>
                      <span className="card-text ml-2">{e[4].eText}</span>
                      <span className="card-text ml-2">{e[5].eText}</span>
                      <span className="card-text ml-2">{e[6].eText}</span>
                      <span className="card-text ml-2">{e[7].eText}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
           
         
        )
      })}
     <div className='d-grid col-6 mx-auto m-3'>
      <button className="btn btn-success mt-3 text-black" style={{backgroundColor:'#DBBDE7'}}
        onClick={AddTest}>Add Test</button>
         <button className="btn btn-success  mt-3 text-black" style={{backgroundColor:'#DBBDE7'}}
        onClick={()=>{navigate('/PersonTest',{state:reciveDataCheck})}}>Go to Test</button>
      </div>
    </div>
    
  )
}
export default AddTwoPersonTest