import { useState, useEffect } from "react"
import {useLocation,useNavigate} from 'react-router-dom'

import GlobalVariables from '../Doctor/Globel'
const AddPersonPratice = () => {
  const [data, setData] = useState([])
  const [selectedOption, setSelectedOption] = useState('a');
  const [selectStage, setSelectStage] = useState('select stage');
  const [checkedItems, setCheckedItems] = useState({});
  const [collectionData, setCollectionData] = useState([]);
  const [collectData, setCollectData] = useState([]);
  const [newPraticData, setNewPracticData] = useState({});
  const[reciveDataCheck,setReciveDataCheck]=useState(0)
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  const location=useLocation();
  useEffect(() => {
    const recivedata=location.state;
    console.log(recivedata)
    setReciveDataCheck(recivedata)
    const fetchDAta = async () => {
      try {
        const responce = await fetch(GlobalVariables.apiUrl + `/api/Person/GetPersons?cid=${recivedata.userId}`);
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
        setCollectData(groupedItems)
      } catch (e) { console.log(e) }
    }
    fetchDAta()
  }, [])
  useEffect(() => {
    console.log(checkedItems)
    console.log(collectionData)
  }, [checkedItems, collectionData]);
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
        return [...prevIds, { personId: itemId }];
      } else {
        // If checkbox is unchecked, filter out the item ID from the array
        return prevIds.filter(idObj => idObj.personId !== itemId);
      }
    });
    console.log(collectionData)
  };

  const newprac = async () => {
    if (title && collectionData) {
     
      try {
        const dataa = { PersonPractice: {  title: title, createdBy: reciveDataCheck.userId,patientId:reciveDataCheck.pid }, Persons: collectionData };
        console.log(dataa);

        const responce = await fetch(GlobalVariables.apiUrl + "/api/Person/Addpractice",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',

            },
            body: JSON.stringify(dataa),
          }

        );
        const res = await responce.json();
        console.log(res)
        navigate('/PersonPractice', { state: reciveDataCheck })
      } catch {
        console.log("data not save")
      }
    }
    else {
      console.log("incomplete data")
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <span className="fs-3 d-block text-center">Add Practice</span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter Practice Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        
      </div>
      <div className="row">
      {Object.entries(collectData)
      
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
                             onChange={(e) => handleCheckboxChange(e, item.id)}
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
        {/* {data.map((item, index) => {
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
                        onChange={(e) => handleCheckboxChange(e, item.id)}
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
        })} */}
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={newprac}>
            <span>ADD new Practice</span>
          </button>
        </div>
      </div>
    </div>


  )
}
export default AddPersonPratice