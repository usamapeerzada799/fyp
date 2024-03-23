import { useEffect, useState } from "react"
import GlobalVariables from "./Globel";
import Modal from "react-modal";

const CreateTest = () => {
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
    
    Modal.setAppElement('#root'); 
    
  useEffect(()=>{console.log(testData)},[testData,testCollectionData])
    useEffect(() => {
        
        const fetchDAta = async () => {
          try {
            const responce = await fetch(GlobalVariables.apiUrl + "/api/Collection/GetAllCollection");
            const data = await responce.json();
            console.log(data);
            setData(data);
            const groupedItems = data.reduce((groups, item) => {
              const { C_group } = item;
              if (!groups[C_group]) {
                groups[C_group] = [];
              }
              groups[C_group].push(item);
              return groups;
            }, {});
            console.log(groupedItems)
            setCollectionData(groupedItems)
          } catch (e) { console.log(e) }
        }
        fetchDAta()
      }, [])
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          if (testQuestonTitle) {
            console.log('Input field is completed:', testQuestonTitle);
            setModel2(true)
            // Perform further actions, such as submitting the form or processing the input
          } else {
            console.log('Input field is empty');
          }
        }
      };
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
        if(testCollectionData.length<4){
          alert('select  at least 4 items for options!')
        }
        else{

         if (testQuestonTitle.trim() !== '') {
            const testCollData={...testCollectionData,testquestion:testQuestonTitle}
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
      const AddTest=async()=>{
        console.log("clikcked")
        try{
          const CollectData=testData.map((e)=>{
            return {collectid:e[0].collectid,op1:e[1].collectid,op2:e[2].collectid,op3:e[3].collectid,questionTitle:e.testquestion}
          })
          const tst={createBy:2,stage:selectStage,title:title}
          const sendTestData={test:tst,collectionsIds:CollectData}
          
          const responce = await fetch(GlobalVariables.apiUrl + "/api/Test/AddNewTest",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',

            },
            body: JSON.stringify(sendTestData),
          }

        );
        const res = await responce.json();
        console.log(res)
        }catch(err){console.log(err)}
       
      }
      const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          width: 400,
        },
      };
  return (
    
    <div>
      <div className="text-white text-center fs-1" style={{borderBottomLeftRadius:'90%' ,height:150,width:'100%',backgroundColor:"#AB91D9",}}>
        <div className=" p-5">Create Test</div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter Test Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3">
            <select className="form-select" value={selectStage} onChange={(e) => setSelectStage(e.target.value)}>
              <option value="select stage">Select Stage</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3">    
            <select className="form-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="a">Alphabets</option>
              <option value="w">Words</option>
              <option value="s">Sentences</option>
            </select>
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
      .filter(([group, items]) => items.some(item => item.type === selectedOption))
      .map(([group, items]) => (
        <div key={group}>
          <h2>{group}</h2>
          <div className="row">
            {items.map((item, index) => {
              if (item.type === selectedOption) {
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
                             onChange={(e) => handleCheckboxChange(e, item.id,item.eText)}
                          />
                        </div>

                        <div className="col-11">
                          <h5 className="card-title">{item.eText}</h5>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              } else {
                return null;
              }
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
        <h2>2.Select right option</h2>
        <h2>3.Select other 3 option</h2>
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
                      <h5 className="card-title">{e.testQuestonTitle}</h5>
                      <span className="card-text mx-2">{e[0].eText}</span>
                      <span className="card-text mx-2">{e[1].eText}</span>
                      <span className="card-text mx-2">{e[2].eText}</span>
                      <span className="card-text ml-2">{e[3].eText}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
           
         
        )
      })}
     
      <button className="btn btn-success mt-3"
        onClick={AddTest}>ok</button>
      
    </div>
    
  )
}
export default CreateTest