import { FaHome } from "react-icons/fa";
import {useLocation,useNavigate} from 'react-router-dom'
import { TfiAlignJustify } from "react-icons/tfi";
import { useState } from "react";
import Modal from "react-modal";
const SideBar = ({ sharedData }) => {
    console.log(sharedData);
    const navigate=useNavigate();
    const[model,setModel]=useState(false)
    Modal.setAppElement('#root');
    
  return (
    
    <div className="">
      {sharedData &&
        <button onClick={()=>setModel(true)} className="mt-3 " style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}  >
          <TfiAlignJustify style={{ height: '30px', width: '30px' }}/>
        </button>}
    <Modal
    isOpen={model}
    onRequestClose={() => setModel(false)}
     // shouldCloseOnOverlayClick={false}
        className="col-2 col-md-2 col-xl-2 px-sm-2 px-0 bg-black">
      <div className="col-auto col-md-12 col-xl-12 px-sm-2 px-0 bg-black"> {/* Changed bg-dark to bg-black */}
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            
            <span className="fs-5 d-none d-sm-inline">Menu</span>
          </a>
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
           
            <li className="nav-item d-flex">
                <button  onClick={()=>navigate('/ShowAllPatients',{state:sharedData})} className="nav-link align-middle px-0">
             
                <FaHome style={{ height: '30px', width: '30px' }} />
                <i className="fs-4"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
             
              </button>
            </li>
            {/* Other menu items */}
          </ul>
          <hr />
          
        </div>
      </div>
      </Modal>
  </div>
);
}
 
export default SideBar