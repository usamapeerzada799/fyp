import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../../css/Doctor/AddPractic.scss'
import GlobalVariables from './Globel'
const AddPractic = () => {
  const [data, setData] = useState([])
  const [selectedOption, setSelectedOption] = useState('a');
  const [selectStage, setSelectStage] = useState('select stage');
  const [checkedItems, setCheckedItems] = useState({});
  const [collectionData, setCollectionData] = useState([]);
  const [newPraticData, setNewPracticData] = useState({});
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDAta = async () => {
      try {
        const responce = await fetch(GlobalVariables.apiUrl + "/api/Collection/GetAllCollection");
        const data = await responce.json();
        console.log(data);
        setData(data);

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
        return [...prevIds, { collectid: itemId }];
      } else {
        // If checkbox is unchecked, filter out the item ID from the array
        return prevIds.filter(idObj => idObj.collectid !== itemId);
      }
    });
    console.log(collectionData)
  };

  const newprac = async () => {
    if (title && selectStage && collectionData) {
      try {
        const dataa = { practice: { stage: selectStage, title: title, createBy: 4 }, collections: collectionData };
        console.log(dataa);

        const responce = await fetch(GlobalVariables.apiUrl + "/api/Practice/AddNewPractice",
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
        navigate('/Practice', { state: data })
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
      <div className="row">
        {data.map((item, index) => {
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
        })}
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
export default AddPractic